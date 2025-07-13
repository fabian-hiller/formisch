import { Navigate, redirect } from '@solidjs/router';

export function GET() {
  return redirect('login');
}

export default function PlaygroundPage() {
  return <Navigate href="login" />;
}
