import Card from "@/components/home/card";
import Balancer from "react-wrap-balancer";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";
import WebcamComponent from "@/components/home/WebcamComponent";
export default async function Home() {
  const { stargazers_count: stars } = await fetch(
      "https://api.github.com/repos/steven-tey/precedent",
      {
        ...(process.env.GITHUB_OAUTH_TOKEN && {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        }),
        // data will revalidate every 24 hours
        next: { revalidate: 86400 },
      },
  )
      .then((res) => res.json())
      .catch((e) => console.log(e));

  return (
      <>

        <div className="z-10 w-full max-w-xl px-5 xl:px-0">

          <div className="container mx-auto">
            {/* Other components or elements */}
            {/* More components or elements */}
          </div>
          <h1
              className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
              style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            <Balancer> EcoTales</Balancer>
          </h1>
          <p
              className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
              style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Green mission for earth rangers
            </Balancer>
          </p>
          <div
              className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <a
                className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
                href={DEPLOY_URL}
                target="_blank"
                rel="noopener noreferrer"
            >
              <svg
                  className="h-4 w-4 group-hover:text-black"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M12 4L20 20H4L12 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </svg>
              <p>Start</p>
            </a>

          </div>
        </div>
        <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
          {features.map(({ title, description, demo, large }) => (
              <Card
                  key={title}
                  title={title}
                  description={description}
                  demo={
                    title === "Beautiful, reusable components" ? (
                        <ComponentGrid />
                    ) : (
                        demo
                    )
                  }
                  large={large}
              />
          ))}
        </div>
      </>
  );
}

const features = [
  {
    title: "Beautiful, reusable components",
    description:
        "",
    large: true,
    },
  {
    title: "",
    description:
        "",
    demo: <div style={{}}>
      <WebcamComponent />

    </div>




  },
  {
    title: "One-click Deploy",
    description:
        "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
    demo: (
        <a href={DEPLOY_URL}>
          <Image
              src="https://vercel.com/button"
              alt="Deploy with Vercel"
              width={120}
              height={30}
              unoptimized
          />
        </a>
    ),
  },


  {
    title: "Green Status",
    description:
        "Recyle everyday to get 100% green status",
    demo: <WebVitals />,
  },
  {
    title: " components",
    description:
        "Pwind CSS](htt, and [Framer Motion](https://framer.com/motion)",

  },

];
