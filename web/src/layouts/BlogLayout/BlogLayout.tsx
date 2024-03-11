import { Link, routes } from '@redwoodjs/router'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <>
      <header className="flex justify-between border-b border-b-gray-300 py-2 pl-3 pr-8">
        <h1 className="text-base font-bold">
          <Link to={routes.home()}>Redwood Blog</Link>
        </h1>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
            <li>
              <Link to={routes.about()}>About</Link>
            </li>
            <li>
              <Link to={routes.contact()}>Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default BlogLayout
