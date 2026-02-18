export default function Chat({ user }) {
  if (!user) return null;

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-3xl">
        Welcome {user.name} 👋
      </h1>
    </div>
  );
}
