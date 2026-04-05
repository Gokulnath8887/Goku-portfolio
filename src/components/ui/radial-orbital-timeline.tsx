"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 768) {
          // Exactly offsets the geometric center to align seamlessly with the left-leaning 470px wide desktop avatar
          setCenterOffset({ x: -250, y: 0 });
        } else {
          // Offsets the center directly to the top-heavy avatar stack on mobile layouts
          setCenterOffset({ x: 0, y: -200 });
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  const autoRotateRef = useRef(autoRotate);
  const rotationAngleRef = useRef(0);
  const viewModeRef = useRef(viewMode);
  const expandedItemsRef = useRef(expandedItems);
  const centerOffsetRef = useRef(centerOffset);
  const activeNodeIdRef = useRef(activeNodeId);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
    viewModeRef.current = viewMode;
    expandedItemsRef.current = expandedItems;
    centerOffsetRef.current = centerOffset;
    activeNodeIdRef.current = activeNodeId;
  }, [autoRotate, viewMode, expandedItems, centerOffset, activeNodeId]);

  const [isVisibleInViewport, setIsVisibleInViewport] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisibleInViewport(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rotationTimer: number;
    let isScrollingTimeout: NodeJS.Timeout;
    let isScrolling = false;
    let lastTime = performance.now();

    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(isScrollingTimeout);
      isScrollingTimeout = setTimeout(() => {
        isScrolling = false;
        lastTime = performance.now();
      }, 150);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    const animate = (time: number) => {
      if (!isVisibleInViewport) {
        rotationTimer = requestAnimationFrame(animate); 
        return;
      }

      if (autoRotateRef.current && viewModeRef.current === "orbital" && !isScrolling) {
        const deltaTime = time - lastTime;
        // 50ms => 1.2 degrees means 24 degrees per second (0.024 * deltaTime)
        rotationAngleRef.current = (rotationAngleRef.current + deltaTime * 0.024) % 360;
        
        timelineData.forEach((item, index) => {
          const el = nodeRefs.current[item.id];
          if (el && !expandedItemsRef.current[item.id]) {
            const angle = ((index / timelineData.length) * 360 + rotationAngleRef.current) % 360;
            const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 240 : 420; 
            const radian = (angle * Math.PI) / 180;

            const x = radius * Math.cos(radian) + centerOffsetRef.current.x;
            const y = radius * Math.sin(radian) + centerOffsetRef.current.y;

            const zIndex = Math.round(10 + 5 * Math.cos(radian));
            const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

            // Use transform3d for GPU acceleration if available, though here translate is standard
            el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            el.style.zIndex = String(zIndex);
            el.style.opacity = String(opacity);
          }
        });
      } else {
        // sync angle back if not animating, so centerViewOnNode works when we resume
        rotationAngleRef.current = rotationAngle;
      }
      lastTime = time;
      rotationTimer = requestAnimationFrame(animate);
    };

    rotationTimer = requestAnimationFrame(animate);

    return () => {
      if (rotationTimer) cancelAnimationFrame(rotationTimer);
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(isScrollingTimeout);
      }
    };
  }, [timelineData, rotationAngle]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
    rotationAngleRef.current = 270 - targetAngle; // Override instantly
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngleRef.current) % 360;
    // Majorly increased radius: mobile 240px, desktop 420px to circle the massive avatars perfectly
    const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 240 : 420; 
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(10 + 5 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-[#D39BC2] border-transparent";
      case "in-progress":
        return "text-[#D39BC2] bg-[#D39BC2]/20 border border-[#D39BC2]/30";
      case "pending":
        return "text-[#D39BC2] bg-transparent border-[#D39BC2]/50";
      default:
        return "text-[#D39BC2] bg-transparent border-[#D39BC2]/50";
    }
  };

  return (
    <div
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden z-0 pointer-events-none"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-6xl h-full flex items-center justify-center pointer-events-auto">
        <div
          className="absolute w-full h-full flex items-center justify-center pointer-events-none"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Outer ring heavily increased to match massive orbiting nodes */}
          <div className="absolute w-[480px] h-[480px] md:w-[840px] md:h-[840px] rounded-full border border-[#D39BC2]/20 pointer-events-none"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 50 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 pointer-events-auto"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 z-0 pointer-events-none ${
                    isPulsing ? "animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(211, 155, 194, 0.3) 0%, rgba(211, 155, 194, 0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  relative z-10 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-xl
                  ${
                    isExpanded
                      ? "bg-[#D39BC2] text-white"
                      : isRelated
                      ? "bg-[#D39BC2] text-white"
                      : "bg-[#D39BC2]/10 text-[#D39BC2]"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-[#D39BC2] shadow-lg shadow-[#D39BC2]/30"
                      : isRelated
                      ? "border-[#D39BC2] animate-[pulse_2s_ease-in-out_infinite]"
                      : "border-[#D39BC2]/50"
                  }
                  transition-all duration-300 transform hover:scale-110
                  ${isExpanded ? "scale-125" : ""}
                `}
                >
                  <Icon size={20} />
                </div>

                <div
                  className={`
                  absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs font-bold tracking-wider pointer-events-none
                  transition-all duration-300
                  ${isExpanded ? "text-[#D39BC2] scale-110" : "text-[#D39BC2]/70 dark:text-[#D39BC2]/70"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-white/20 dark:bg-black/40 backdrop-blur-3xl border-white/20 shadow-2xl overflow-visible z-50">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#D39BC2]/50"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 py-0 text-[10px] ${getStatusStyles(item.status)}`}>
                          {item.status === "completed" ? "COMPLETE" : item.status === "in-progress" ? "IN PROGRESS" : "PENDING"}
                        </Badge>
                        <span className="text-xs font-mono text-[#D39BC2]/60">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-3 text-[#D39BC2]">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-foreground/80 leading-relaxed font-medium">
                      <p>{item.content}</p>
                      <div className="mt-4 pt-3 border-t border-[#D39BC2]/20">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center text-[#D39BC2]">
                            <Zap size={10} className="mr-1 text-yellow-400" />
                            Energy Match
                          </span>
                          <span className="font-mono text-[#D39BC2] font-bold">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#D39BC2]/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#D39BC2] to-[#A78BFA]"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-[#D39BC2]/20">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-[#D39BC2]/50 mr-1" />
                            <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#D39BC2]/50">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-[10px] rounded-sm border-[#D39BC2]/30 bg-transparent hover:bg-[#D39BC2] text-[#D39BC2] hover:text-white transition-all"
                                  onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="ml-1 opacity-50" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
