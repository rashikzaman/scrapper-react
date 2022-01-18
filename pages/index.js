import Dashboard from '../components/Dashboard/Dashboard';

export default function Home({ user }) {
  return (
    <div>
      <Dashboard user={user} />
    </div>
  )
}
