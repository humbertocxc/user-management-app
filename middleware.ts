import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signup",
  },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
