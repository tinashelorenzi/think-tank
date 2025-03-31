import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRightIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  SparklesIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  StarIcon,
  PuzzlePieceIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { ParallaxSection } from "../components/ParallaxSection";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { Navigation } from "../components/Navigation";

const features = [
  {
    name: "Institution-wide Learning",
    description:
      "Empower your entire institution with a comprehensive learning platform that scales with your needs.",
    icon: AcademicCapIcon,
  },
  {
    name: "Advanced Analytics",
    description:
      "Get detailed insights into student performance, engagement metrics, and learning outcomes across your institution.",
    icon: ChartBarIcon,
  },
  {
    name: "Seamless Integration",
    description:
      "Integrate with your existing LMS and educational tools for a unified learning experience.",
    icon: PuzzlePieceIcon,
  },
  {
    name: "Enterprise Security",
    description:
      "Bank-grade security and compliance with FERPA, GDPR, and other educational data protection standards.",
    icon: ShieldCheckIcon,
  },
];

const testimonials = [
  {
    content:
      "ThinkTank has transformed how we deliver education across our university. The platform's scalability and integration capabilities have made it an invaluable part of our learning ecosystem.",
    author: {
      name: "Dr. Sarah Johnson",
      role: "Vice Chancellor of Academic Affairs",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    content:
      "The analytics and reporting features have given us unprecedented visibility into student performance and engagement across all departments.",
    author: {
      name: "Michael Chen",
      role: "Director of Educational Technology",
      image:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    content:
      "Implementing ThinkTank has streamlined our administrative processes and improved collaboration between departments significantly.",
    author: {
      name: "Emily Rodriguez",
      role: "Dean of Digital Learning",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    {
      name: "Twitter",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.06-1.601-1.167-1.601-1.167 0-1.344.91-1.344 1.601v5.604h-3v-11h3v1.765c.481-.78 1.327-1.267 2.25-1.267 1.6 0 3.2 1.067 3.2 3.005v6.497z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

interface Feature {
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-card flex flex-col p-6 relative overflow-hidden group"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={false}
      />
      <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-white relative z-10">
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
          <feature.icon
            className="h-6 w-6 text-primary-500"
            aria-hidden="true"
          />
        </motion.div>
        {feature.name}
      </dt>
      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300 relative z-10">
        <p className="flex-auto">{feature.description}</p>
      </dd>
    </motion.div>
  );
};

interface Testimonial {
  content: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-8 relative overflow-hidden group"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={false}
      />
      <div className="flex items-center gap-x-4 relative z-10">
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
          <img
            className="h-12 w-12 rounded-full bg-gray-800 ring-2 ring-primary-500/20"
            src={testimonial.author.image}
            alt={testimonial.author.name}
          />
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold leading-8 text-white">
            {testimonial.author.name}
          </h3>
          <div className="text-sm leading-6 text-gray-300">
            {testimonial.author.role}
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-7 text-gray-300 relative z-10">
        {testimonial.content}
      </p>
    </motion.div>
  );
};

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      <AnimatedBackground />
      <Navigation />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <AnimatedBackground />
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <motion.div
            className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-primary-500/10 px-3 py-1 text-sm font-semibold leading-6 text-primary-500 ring-1 ring-inset ring-primary-500/20">
                  New Features
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                  <span>Enterprise-grade security</span>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Transform Your Institution's Learning Experience
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Empower your entire institution with a comprehensive learning
              platform that scales with your needs. From small colleges to large
              universities, we provide the tools and insights you need to
              deliver exceptional education.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button"
              >
                Schedule a Demo
              </motion.button>
              <a
                href="#features"
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </motion.div>
          <motion.div
            className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <img
                src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <ParallaxSection id="features" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-base font-semibold leading-7 text-primary-500">
                Everything you need
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Features that empower your learning
              </p>
            </motion.div>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.name}
                  feature={feature}
                  index={index}
                />
              ))}
            </dl>
          </div>
        </div>
      </ParallaxSection>

      {/* Testimonials Section */}
      <ParallaxSection id="testimonials" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary-500">
                Testimonials
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Loved by students and instructors
              </p>
            </motion.div>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.author.name}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* CTA Section */}
      <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
        <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl">
          <div
            className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.125rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to transform your institution?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Join leading educational institutions in delivering exceptional
            learning experiences. Schedule a demo to see how we can help.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-button"
            >
              Schedule a Demo
            </motion.button>
            <a
              href="/contact"
              className="text-sm font-semibold leading-6 text-white"
            >
              Contact sales <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
          aria-hidden="true"
        >
          <div
            className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.125rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative mt-32 sm:mt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold leading-6 text-white">
                  Navigation
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold leading-6 text-white">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      to="/privacy"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cookies"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold leading-6 text-white">
                  Social
                </h3>
                <ul role="list" className="mt-6 flex space-x-10">
                  {navigation.social.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-gray-400 hover:text-gray-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="sr-only">{item.name}</span>
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
              <p className="text-xs leading-5 text-gray-400">
                &copy; {new Date().getFullYear()} ThinkTank. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
