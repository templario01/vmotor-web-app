export default function MainLayout({ children }: any) {
  return (
    <main className="min-h-screen flex-col bg-white">
      {children}
    </main>
  );
}
