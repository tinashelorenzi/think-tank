import { motion } from "framer-motion";
import { ParallaxSection } from "../components/ParallaxSection";
import { Layout } from "../components/Layout";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const contactInfo = [
  {
    name: "Email",
    description: "Get in touch with us via email",
    icon: EnvelopeIcon,
    value: "contact@thinktank.com",
  },
  {
    name: "Phone",
    description: "Call us for immediate assistance",
    icon: PhoneIcon,
    value: "+1 (555) 123-4567",
  },
  {
    name: "Office",
    description: "Visit our headquarters",
    icon: MapPinIcon,
    value: "123 Learning Street, Education City, EC 12345",
  },
];

export default function Contact() {
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
                Contact Us
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Have questions? We'd love to hear from you. Send us a message
                and we'll respond as soon as possible.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <ParallaxSection className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              {contactInfo.map((info) => (
                <motion.div
                  key={info.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-8"
                >
                  <dt className="flex items-center justify-center gap-x-3 text-xl font-semibold leading-7 text-white">
                    <info.icon
                      className="h-6 w-6 text-primary-500"
                      aria-hidden="true"
                    />
                    {info.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">{info.description}</p>
                    <p className="mt-6 text-lg font-semibold leading-8 text-white">
                      {info.value}
                    </p>
                  </dd>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Contact Form Section */}
      <ParallaxSection className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 bg-dark-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 bg-dark-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 bg-dark-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Subject
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 bg-dark-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Message
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-700 bg-dark-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-x-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    className="glass-button"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="glass-button bg-primary-500 text-white hover:bg-primary-600"
                  >
                    Send message
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>
    </Layout>
  );
}
