import { NavLink } from "@/components/ui/nav-link";
import { navigationLinks } from "@/lib/navigation";

export function PrimaryNav() {
  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center gap-8">
        {navigationLinks.map((link) => (
          <li key={link.href}>
            <NavLink href={link.href} className="type-small py-2">
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
