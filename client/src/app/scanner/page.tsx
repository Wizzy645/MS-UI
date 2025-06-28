// src/app/scanner/page.tsx
import Scanner from "@/app/components/Scanner";

// Optional: simulate getting user info
const getUser = async () => {
  // Simulate a server-side user retrieval, e.g. from auth/cookies/session
  return {
    name: "Guest",
  };
};

export default async function ScannerPage() {
  const user = await getUser(); // or hardcode temporarily

  return <Scanner user={user} />;
}
