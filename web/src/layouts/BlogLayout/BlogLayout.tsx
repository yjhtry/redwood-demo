import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, logOut, currentUser } = useAuth()
  console.log(currentUser)
  return (
    <>
      <header className="flex justify-between border-b border-b-gray-300 py-2 pl-3 pr-8">
        <h1 className="text-base font-bold">
          <Link to={routes.home()}>Redwood Blog</Link>
        </h1>
        <nav className="flex gap-6">
          <ul className="flex gap-4">
            <li className="hover:text-blue-300">
              <Link to={routes.home()}>Home</Link>
            </li>
            <li className="hover:text-blue-300">
              <Link to={routes.about()}>About</Link>
            </li>
            <li className="hover:text-blue-300">
              <Link to={routes.contact()}>Contact</Link>
            </li>
          </ul>
          {isAuthenticated ? (
            <div>
              <span>{currentUser.email as string}</span>
              <button className="ml-2" type="button" onClick={logOut}>
                Logout
              </button>
            </div>
          ) : (
            <Link to={routes.login()}>Login</Link>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default BlogLayout
