import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { prisma } from '@/db/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function AuthDebug() {
  const { user, profile, loading } = useAuth();
  const [envCheck, setEnvCheck] = useState<{ url: boolean; key: boolean }>({ url: false, key: false });
  const [sessionCheck, setSessionCheck] = useState<any>(null);

  useEffect(() => {
    // Check environment variables
    setEnvCheck({
      url: !!import.meta.env.VITE_DATABASE_URL,
      key: !!import.meta.env.VITE_JWT_SECRET,
    });

    // Check if user is logged in
    setSessionCheck({ user: !!user, loading });
  }, [user, loading]);

  const testSignUp = async () => {
    // Temporarily disabled during migration
    alert('Auth testing disabled during migration to Neon');
  };

  const testSignIn = async () => {
    // Temporarily disabled during migration
    alert('Auth testing disabled during migration to Neon');

    console.log('Sign in result:', { data, error });
    alert(error ? `Error: ${error.message}` : 'Sign in successful! Check console for details.');
  };

  const StatusIcon = ({ status }: { status: boolean }) => (
    status ? <CheckCircle className="h-5 w-5 text-chart-2" /> : <XCircle className="h-5 w-5 text-destructive" />
  );

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold mb-2">Authentication Debug</h1>
          <p className="text-muted-foreground">Diagnostic information for authentication system</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>Check if Supabase credentials are loaded</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>VITE_SUPABASE_URL</span>
              <div className="flex items-center gap-2">
                <StatusIcon status={envCheck.url} />
                <Badge variant={envCheck.url ? 'default' : 'destructive'}>
                  {envCheck.url ? 'Set' : 'Missing'}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>VITE_SUPABASE_ANON_KEY</span>
              <div className="flex items-center gap-2">
                <StatusIcon status={envCheck.key} />
                <Badge variant={envCheck.key ? 'default' : 'destructive'}>
                  {envCheck.key ? 'Set' : 'Missing'}
                </Badge>
              </div>
            </div>
            {envCheck.url && (
              <div className="text-sm text-muted-foreground mt-4">
                <strong>URL:</strong> {import.meta.env.VITE_SUPABASE_URL}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Auth Context State</CardTitle>
            <CardDescription>Current authentication state from AuthContext</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Loading</span>
              <Badge variant={loading ? 'secondary' : 'default'}>
                {loading ? 'True' : 'False'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>User</span>
              <div className="flex items-center gap-2">
                <StatusIcon status={!!user} />
                <Badge variant={user ? 'default' : 'secondary'}>
                  {user ? 'Authenticated' : 'Not authenticated'}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Profile</span>
              <div className="flex items-center gap-2">
                <StatusIcon status={!!profile} />
                <Badge variant={profile ? 'default' : 'secondary'}>
                  {profile ? 'Loaded' : 'Not loaded'}
                </Badge>
              </div>
            </div>
            {user && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">User Details:</p>
                <pre className="text-xs overflow-auto">{JSON.stringify(user, null, 2)}</pre>
              </div>
            )}
            {profile && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Profile Details:</p>
                <pre className="text-xs overflow-auto">{JSON.stringify(profile, null, 2)}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supabase Session</CardTitle>
            <CardDescription>Direct session check from Supabase client</CardDescription>
          </CardHeader>
          <CardContent>
            {sessionCheck ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Session exists</span>
                  <div className="flex items-center gap-2">
                    <StatusIcon status={!!sessionCheck.session} />
                    <Badge variant={sessionCheck.session ? 'default' : 'secondary'}>
                      {sessionCheck.session ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
                {sessionCheck.error && (
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm">{sessionCheck.error.message}</span>
                  </div>
                )}
                {sessionCheck.session && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-2">Session Details:</p>
                    <pre className="text-xs overflow-auto">{JSON.stringify(sessionCheck.session, null, 2)}</pre>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">Loading...</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Actions</CardTitle>
            <CardDescription>Test authentication functions directly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={testSignUp} className="w-full">
              Test Sign Up (New User)
            </Button>
            <Button onClick={testSignIn} variant="outline" className="w-full">
              Test Sign In (Admin Account)
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Check browser console for detailed logs
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
