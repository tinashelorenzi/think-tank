import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { AnimatedBackground } from "./AnimatedBackground";
import { footerNav } from "../config/navigation";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <AnimatedBackground />
      <Navigation />
      <main className="pt-16">{children}</main>
      <footer className="bg-dark-900/50 backdrop-blur-lg border-t border-white/5">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerNav.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-base text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-white/5 pt-8">
            <p className="text-base text-gray-400 text-center">
              © {new Date().getFullYear()} ThinkTank. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
