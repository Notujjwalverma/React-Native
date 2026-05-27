const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({ logger: false })

server.use(middlewares)
server.use(jsonServer.bodyParser)

// ─────────────────────────────────────────
//  Helper: generate a fake token
// ─────────────────────────────────────────
function generateToken(userId) {
  return `mis-token-${userId}-${Date.now()}`
}

// ─────────────────────────────────────────
//  POST /login
// ─────────────────────────────────────────
server.post('/login', (req, res) => {
  const { email, password } = req.body

  // 1. Check required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password are required'
    })
  }

  // 2. Find user in db.json
  const db = router.db.getState()
  const user = db.users.find(
    u => u.email === email && u.password === password
  )

  // 3. Wrong credentials
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Invalid email or password'
    })
  }

  // 4. Success — return token + safe user object (no password)
  const { password: _hidden, ...safeUser } = user

  res.status(200).json({
    success: true,
    token: generateToken(user.id),
    user: safeUser
  })
})

// ─────────────────────────────────────────
//  POST /logout
// ─────────────────────────────────────────
server.post('/logout', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  })
})

// ─────────────────────────────────────────
//  All other routes → require Bearer token
//  (ready for Week 2 screens)
// ─────────────────────────────────────────
server.use((req, res, next) => {
  const open = ['/login', '/logout']
  if (open.includes(req.path)) return next()

  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized. Please login first.'
    })
  }

  next()
})

server.use(router)

// ─────────────────────────────────────────
//  Start
// ─────────────────────────────────────────
const PORT = 3001
server.listen(PORT, () => {
  console.log('')
  console.log('  ✅  Mock API running on http://localhost:' + PORT)
  console.log('')
  console.log('  Endpoints (Week 1):')
  console.log('  POST  /login    → returns token + user')
  console.log('  POST  /logout   → clears session')
  console.log('')
  console.log('  Test accounts:')
  console.log('  Employee  →  john@company.com   / password123')
  console.log('  Admin     →  admin@company.com  / admin123')
  console.log('  Employee  →  rahul@company.com  / rahul123')
  console.log('')
  console.log('  RN base URL:')
  console.log('  Android emulator  →  http://10.0.2.2:3001')
  console.log('  iOS simulator     →  http://localhost:3001')
  console.log('  Real device       →  http://<your-ip>:3001')
  console.log('')
})
