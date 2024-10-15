"use client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="flex place-items-center h-screen justify-center">
        {children}
      </div>
    </section>
  );
}
