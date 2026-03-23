import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import API from "@/services/api";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await API.post("/admin/login", {
        email,
        password,
      });

      if (res.data.success) {
          login(res.data.token)
           toast.success("Login successful")

        // ✅ important
        navigate("/")
      }

    } catch (err) {
      toast.error("Invalid credentials")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>

            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="h-11"
            />

            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-11"
            />

            <Button type="submit" disabled={loading} className="w-full h-11">
              {loading ? 'Logging in...' : 'Login'}
            </Button>

          </form>

          <div className="mt-4 text-sm text-center text-gray-600">
            <p>Demo credentials: admin@example.com / admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login