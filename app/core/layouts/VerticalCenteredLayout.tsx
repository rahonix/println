import { Head, BlitzLayout } from "blitz"

const CenteredLayout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "println"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </>
  )
}

export default CenteredLayout
