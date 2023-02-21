import { ChakraProvider, cookieStorageManagerSSR } from "@chakra-ui/react";
import { withEmotionCache } from "@emotion/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useContext, useEffect, useMemo } from "react";
import { ClientStyleContext, ServerStyleContext } from "./utils/context";
import { theme } from "./utils/theme";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Project Name",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request }) => {
  return request.headers.get("cookie") ?? "";
};

const DEFAULT_COLOR_MODE: "dark" | "light" | null = "dark";
const CHAKRA_COOKIE_COLOR_KEY = "chakra-ui-color-mode";

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    let cookies = useLoaderData<string>();

    if (typeof document !== "undefined") {
      cookies = document.cookie;
    }

    let colorMode = useMemo(() => {
      let color = getColorMode(cookies);

      if (!color && DEFAULT_COLOR_MODE) {
        cookies += ` ${CHAKRA_COOKIE_COLOR_KEY}=${DEFAULT_COLOR_MODE}`;
        color = DEFAULT_COLOR_MODE;
      }

      return color;
    }, [cookies]);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag: any) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html
        lang="en"
        {...(colorMode && {
          "data-theme": colorMode,
          style: { colorScheme: colorMode },
        })}
      >
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body
          {...(colorMode && {
            className: `chakra-ui-${colorMode}`,
          })}
        >
          <ChakraProvider
            theme={theme}
            colorModeManager={cookieStorageManagerSSR(cookies)}
          >
            {children}
          </ChakraProvider>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

function getColorMode(cookies: string) {
  const match = cookies.match(
    new RegExp(`(^| )${CHAKRA_COOKIE_COLOR_KEY}=([^;]+)`)
  );
  return match == null ? void 0 : match[2];
}

export default function App() {
  return (
    <Document>
      <ChakraProvider theme={theme}>
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}
