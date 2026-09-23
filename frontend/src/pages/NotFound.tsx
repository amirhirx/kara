export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-col gap-2 w-6/12">
        <h1 className="text-2xl font-bold">Oops... Page Not found!</h1>
        <p>The page you’re looking for doesn’t exist or may have been moved.</p>
      </div>
    </div>
  );
}
