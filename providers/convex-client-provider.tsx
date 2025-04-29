"use client";

import { ClerkProvider, SignIn, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient, Unauthenticated } from "convex/react";
import type { PropsWithChildren } from "react";

import { Loading } from "@/components/auth/loading";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>

        <AuthLoading>
          <Loading />
        </AuthLoading>
        <Unauthenticated>
          <div className="h-full w-full flex flex-col justify-center items-center">
            <SignIn />
          </div>
        </Unauthenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
