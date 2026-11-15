
const adminNavGroups = [
  {
    title: "Workspace",
    items: [
      { label: "Admin Overview", href: "/admin", icon: "LayoutDashboard" },
      { label: "Main Dashboard", href: "/dashboard", icon: "House" },
      { label: "CRM", href: "/crm", icon: "Users" },
    ],
  },
  {
    title: "Organization Management",
    items: [
      { label: "Bank Management", href: "/admin/banks", icon: "Landmark", available: false },
      { label: "Organizations", href: "/admin/organizations", icon: "Building2", available: false },
      { label: "Branches", href: "/admin/branches", icon: "GitBranch", available: false },
      { label: "Departments", href: "/admin/departments", icon: "Network", available: false },
    ],
  },
  {
    title: "User & Access Management",
    items: [
      { label: "All Users & Approvals", href: "/admin/users", icon: "UserCog", badge: "pending" },
      { label: "Roles Management", href: "/admin/roles", icon: "ShieldCheck", available: false },
      { label: "Permissions", href: "/admin/users/permissions", icon: "KeyRound", available: false },
      { label: "Employees", href: "/admin/employees", icon: "ContactRound", available: false },
    ],
  },
  {
    title: "Credit & Borrowers",
    items: [
      { label: "Corporates", href: "/corporates", icon: "Building" },
      { label: "Borrowers", href: "/borrowers", icon: "UsersRound" },
      { label: "Loans", href: "/loans", icon: "Wallet" },
      { label: "Defaults / NPA", href: "/defaults", icon: "AlertTriangle" },
    ],
  },
  {
    title: "Legal Management",
    items: [
      { label: "Legal Cases", href: "/legal", icon: "Scale" },
      { label: "Notices", href: "/notices", icon: "FileWarning" },
      { label: "eCourts Integration", href: "/ecourts-sync", icon: "Landmark" },
      { label: "Advocates", href: "/advocates", icon: "BriefcaseBusiness" },
      { label: "Laws & Compliance", href: "/laws", icon: "BookOpen" },
      { label: "Documents", href: "/documents", icon: "Files" },
    ],
  },
  {
    title: "Recovery Management",
    items: [
      { label: "Recovery Dashboard", href: "/recovery", icon: "TrendingUp" },
      { label: "OTS Settlement", href: "/recovery/ots", icon: "Handshake" },
      { label: "Settlement Management", href: "/admin/settlements", icon: "FileCheck", available: false },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Tasks", href: "/tasks", icon: "ClipboardList" },
      { label: "Communications", href: "/communications", icon: "MessageSquare" },
    ],
  },
  {
    title: "Intelligence & Reports",
    items: [
      { label: "AI Intelligence", href: "/ai-intelligence", icon: "BrainCircuit" },
      { label: "Reports & Analytics", href: "/reports", icon: "ChartNoAxesCombined" },
    ],
  },
  {
    title: "System Administration",
    items: [
      { label: "Templates", href: "/admin/templates", icon: "FileText", available: false },
      { label: "System Rules", href: "/admin/system-rules", icon: "Settings2", available: false },
      { label: "Integrations", href: "/admin/integrations", icon: "Plug", available: false },
      { label: "Admin Profile", href: "/admin/profile", icon: "UserCog" },
      { label: "Settings", href: "/admin/settings", icon: "Settings" },
      { label: "Audit Logs", href: "/admin/audit-logs", icon: "ScrollText" },
    ],
  },
];

export default adminNavGroups;
