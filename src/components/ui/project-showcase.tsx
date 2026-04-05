import GlareHover from "./GlareHover"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import React from "react"
import ShinyText from "./ShinyText"

interface Project {
  title: string
  description: string
  link: string
  image: string
}

const projects: Project[] = [
  {
    title: "Chinnathirupathi Sky Yoga",
    description: "A serene yoga and wellness center website offering holistic guidance.",
    link: "https://www.chinnathirupathiskyyoga.in",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop",
  },
  {
    title: "Eppo Varum Bus Tracker",
    description: "Real-time transport tracking application for urban commuters.",
    link: "https://eppo-varum-bus-tracker.vercel.app",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop",
  },
  {
    title: "Dazzle Deals",
    description: "Integrated e-commerce platform with admin panel and database.",
    link: "https://dazzle-deals.vercel.app",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&auto=format&fit=crop",
  },
]

export function ProjectShowcase() {
  return (
    <section className="relative w-full py-8 overflow-hidden bg-background/50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-foreground uppercase text-center mb-12 leading-none">
          <ShinyText text="PROJECTS" speed={2} color="#8a3d72" shineColor="#ffffff" spread={55} className="font-black" /> <br className="md:hidden" />
          <ShinyText text="LIVE PRODUCTION" speed={2.5} delay={1} color="#5a2a4a" shineColor="#D39BC2" spread={55} className="font-black" />
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <GlareHover
                width="100%"
                height="480px"
                borderRadius="2.5rem"
                background="hsl(var(--card))"
                borderColor="hsl(var(--border))"
                glareColor="#ffffff"
                glareOpacity={0.4}
                glareSize={200}
                className="max-w-[340px] shadow-2xl hover:shadow-[#D39BC2]/20 transition-all duration-500"
              >
                <div className="relative w-full h-full overflow-hidden flex flex-col">
                  {/* Project Image */}
                  <div className="relative h-2/3 w-full overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col justify-end bg-gradient-to-b from-transparent to-black/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-black tracking-tight text-white uppercase leading-none">
                        <ShinyText text={project.title} speed={2} color="#aaaaaa" shineColor="#ffffff" spread={55} className="font-black" />
                      </h3>
                      <ArrowUpRight className="text-[#D39BC2] opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                    </div>
                    <p className="text-sm text-white/70 font-medium leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </GlareHover>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

