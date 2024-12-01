'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
} from "@/components/ui/alert-dialog";

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple login validation (replace with your actual authentication logic)
    if (username === 'admin' && password === 'password') {
      // Successful login
      router.push('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleLogin} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input 
          id="username" 
          type="text" 
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required 
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
      </div>
      {error && (
        <AlertDialog open={!!error}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Login Error</AlertDialogTitle>
              <AlertDialogDescription>
                {error}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setError('')}>
                Okay
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}