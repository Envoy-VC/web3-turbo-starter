import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className='flex gap-2 p-2 font-sans'>
        <Link className='[&.active]:font-bold' to='/'>
          Home
        </Link>
        <Link className='[&.active]:font-bold' to='/about'>
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

export default Route;
