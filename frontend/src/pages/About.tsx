import { motion } from "framer-motion";
import { ParallaxSection } from "../components/ParallaxSection";
import { Layout } from "../components/Layout";
import {
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const stats = [
  { name: "Active Students", value: "10,000+" },
  { name: "Courses Available", value: "500+" },
  { name: "Expert Instructors", value: "200+" },
  { name: "Success Rate", value: "95%" },
];

const values = [
  {
    name: "Innovation",
    description:
      "We constantly push the boundaries of what's possible in education.",
    icon: SparklesIcon,
  },
  {
    name: "Excellence",
    description:
      "We strive for excellence in everything we do, from content quality to user experience.",
    icon: AcademicCapIcon,
  },
  {
    name: "Community",
    description:
      "We believe in the power of community and collaborative learning.",
    icon: UserGroupIcon,
  },
  {
    name: "Growth",
    description:
      "We're committed to continuous improvement and growth, both for our platform and our users.",
    icon: ChartBarIcon,
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Michael Chen",
    role: "Head of Technology",
    image:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Emily Rodriguez",
    role: "Content Director",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center relative z-10"
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                About ThinkTank
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                We're on a mission to revolutionize education through technology
                and innovation. Our platform empowers learners worldwide to
                achieve their full potential.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <ParallaxSection className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 rounded-3xl text-center"
                >
                  <dt className="text-base leading-7 text-gray-300">
                    {stat.name}
                  </dt>
                  <dd className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {stat.value}
                  </dd>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Values Section */}
      <ParallaxSection className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Our Values
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                These principles guide everything we do at ThinkTank.
              </p>
            </motion.div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {values.map((value) => (
                <motion.div
                  key={value.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 rounded-3xl"
                >
                  <div className="flex items-center gap-x-4">
                    <value.icon
                      className="h-8 w-8 text-primary-500"
                      aria-hidden="true"
                    />
                    <h3 className="text-lg font-semibold leading-8 text-white">
                      {value.name}
                    </h3>
                  </div>
                  <p className="mt-4 text-base leading-7 text-gray-300">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Team Section */}
      <ParallaxSection className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Meet Our Team
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                The passionate individuals behind ThinkTank.
              </p>
            </motion.div>
            <ul
              role="list"
              className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            >
              {team.map((person) => (
                <motion.li
                  key={person.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 rounded-3xl text-center"
                >
                  <img
                    className="mx-auto h-32 w-32 rounded-full ring-4 ring-primary-500/20"
                    src={person.image}
                    alt={person.name}
                  />
                  <h3 className="mt-6 text-lg font-semibold leading-8 text-white">
                    {person.name}
                  </h3>
                  <p className="text-base leading-7 text-gray-300">
                    {person.role}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </ParallaxSection>
    </Layout>
  );
}
