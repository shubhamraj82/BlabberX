import SignedInClientLayout from "../../components/SignedInClientLayout";

 function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SignedInClientLayout>{children}</SignedInClientLayout>
  )
}
export default Layout;