import { motion } from "framer-motion";
import { ParallaxSection } from "../components/ParallaxSection";
import { Layout } from "../components/Layout";
import { CheckIcon } from "@heroicons/react/24/outline";

const tiers = [
  {
    name: "Small Institution",
    id: "tier-small",
    price: { monthly: "$499", annually: "$4,990" },
    description:
      "Perfect for small schools and universities with up to 1,000 students.",
    features: [
      "Up to 1,000 student accounts",
      "Basic course management",
      "Institution-wide analytics",
      "Standard support",
      "Basic API access",
      "Mobile app access",
      "Progress tracking",
    ],
    featured: false,
  },
  {
    name: "Medium Institution",
    id: "tier-medium",
    price: { monthly: "$999", annually: "$9,990" },
    description:
      "Ideal for medium-sized educational institutions with up to 5,000 students.",
    features: [
      "Up to 5,000 student accounts",
      "Advanced course management",
      "Detailed analytics dashboard",
      "Priority support",
      "Advanced API access",
      "Custom branding",
      "Team management",
      "SLA guarantee",
    ],
    featured: true,
  },
  {
    name: "Large Institution",
    id: "tier-large",
    price: { monthly: "Custom", annually: "Custom" },
    description:
      "For large universities and educational networks with 5,000+ students.",
    features: [
      "Unlimited student accounts",
      "Enterprise course management",
      "Advanced analytics & reporting",
      "Dedicated support team",
      "Full API access",
      "Custom integrations",
      "Advanced security features",
      "24/7 support",
      "Custom training",
    ],
    featured: false,
  },
];

const faqs = [
  {
    question: "How do you handle student data privacy?",
    answer:
      "We comply with FERPA, GDPR, and other relevant data protection regulations. All student data is encrypted and stored securely in compliance with educational institution requirements.",
  },
  {
    question: "Can we integrate with our existing LMS?",
    answer:
      "Yes, we offer seamless integration with popular Learning Management Systems like Canvas, Moodle, and Blackboard. We also provide custom integration options for proprietary systems.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer comprehensive support including technical assistance, training sessions for faculty, and dedicated account managers for larger institutions. Support levels vary by plan.",
  },
  {
    question: "How do you handle scaling for large institutions?",
    answer:
      "Our platform is built to scale efficiently with your institution's needs. We can handle thousands of concurrent users and provide custom solutions for specific requirements.",
  },
];

export default function Pricing() {
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
                Institution-wide Learning Solutions
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Empower your entire institution with our comprehensive learning
                platform. Choose the plan that best fits your institution's size
                and needs.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <ParallaxSection className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-base font-semibold leading-7 text-primary-500">
                Institution Plans
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Scale your institution's learning capabilities
              </p>
            </motion.div>
          </div>
          <div className="isolate mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3">
            {tiers.map((tier) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`glass-card p-8 ${
                  tier.featured ? "ring-2 ring-primary-500" : ""
                }`}
              >
                <h3 className="text-lg font-semibold leading-8 text-white">
                  {tier.name}
                </h3>
                <p className="mt-4 text-sm leading-6 text-gray-300">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">
                    {tier.price.monthly}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-300">
                    /month
                  </span>
                </p>
                <p className="text-sm leading-6 text-gray-300">
                  or {tier.price.annually}/year
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-300"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-primary-500"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    tier.featured
                      ? "bg-primary-500 text-white hover:bg-primary-600 focus-visible:outline-primary-500"
                      : "glass-button"
                  }`}
                >
                  Contact Sales
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* FAQ Section */}
      <ParallaxSection className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl divide-y divide-gray-700">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-base font-semibold leading-7 text-primary-500">
                FAQ
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Common questions from educational institutions
              </p>
            </motion.div>
            <dl className="mt-10 space-y-6 divide-y divide-gray-700">
              {faqs.map((faq) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="pt-6"
                >
                  <dt className="text-lg font-semibold leading-7 text-white">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-300">
                    {faq.answer}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </ParallaxSection>
    </Layout>
  );
}
