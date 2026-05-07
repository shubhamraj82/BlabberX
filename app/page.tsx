import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import { MessageCircle, Video, Shield, Zap, Users } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header/>

      <main className="flex flex-1 flex-col items-center gap-20 px-4 py-16 text-center sm:px-6">
        <div className="relative w-full max-w-5xl space-y-8">
          {/* backgroundGradient */}
          <div className="absolute inset-0 -z-10 scale-125 rounded-3xl bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-60 blur-3xl dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20"></div>

          <div className="relative mx-auto max-w-4xl space-y-8">
            <h1 className="bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 sm:text-7xl">
              Connect instantly
              <br />
              <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
                Chat smarter
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
              The modern messaging platform that combines lightning-fast chat crystal-clear video calls in one seamless experience.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button size="lg" className="h-auto rounded-full px-8 py-6 text-lg shadow-lg shadow-primary/20">
                  Start Chatting Free
                </Button>
              </SignInButton>
            </Show>
          </div>

          {/* Social proof */}
          <div className="mx-auto glass-card max-w-3xl rounded-2xl p-6 pt-8">
            <p className="mb-4 text-sm text-muted-foreground">
              Trusted by thousands of users worldwide
            </p>
            <div className="flex items-center justify-center gap-8 text-muted-foreground">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">50K</div>
                <div className="text-sm">Active Users</div>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">1M+</div>
                <div className="text-sm">Messages Sent</div>
              </div>
              <div className="w-px h-8 bg-border"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">99.9%</div>
                  <div className="text-sm">Uptime</div>
                </div>
            </div>
          </div>

          {/* enhanced features sections */}
          <div className="w-full max-w-6xl rounded-3xl border bg-card/30 p-6 sm:p-10">
            {/* section divider */}
            <div className="w-full flex items-center justify-center mb-16">
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-border to-transparent "></div>
              <div className="px-6">
                <div className="w-2 h-2 rounded-full bg-primary/60"></div>
              </div>
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-border to-transparent "></div>
            </div>


            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
                Everything you need to stay connected
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Powerful features designed for seamless communication,wether you&apos;re chatting with friends or collaborating with colleagues.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              <FeatureCard
              icon={MessageCircle}
              title="Instant Messaging"
              description="Lightning-fast messages with real-time delivery. Chat with friends and colleagues seamlessly."
              />
               <FeatureCard
              icon={Video}
              title="HD Video Calls"
              description="Crystal-clear video calls with just one click. Perfect quality for personal chats and team meetings."
              />
               <FeatureCard
              icon={Shield}
              title="Privacy First"
              description="End to end encryption keeps your conversations private. Your data belongs to you, always"
              />
               <FeatureCard
              icon={Users}
              title="Group Chats"
              description="Chat with your friends, family, or colleagues in groups. Perfect for team discussions and collaborations."
              />
               <FeatureCard
              icon={Zap}
              title="Lightning-Fast "
              description="Optimized for speed and performance. Your messages and calls are delivered instantly."
              />
            </div>
          </div>


          {/* enhanced CTA sections */}
          <div className="w-full max-w-4xl">
            <div className="rounded-3xl border bg-linear-to-br from-primary/5 to-primary/10 p-8 text-center shadow-lg shadow-primary/10 sm:p-12">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Ready to transform your conversations
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                Join thousands of Users who&apos;ve already discovered the power of BlabberX. Start your free trial today and experience the future of messaging.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Show when="signed-out">
                  <SignUpButton mode="modal">
                    <Button size="lg" className="h-auto rounded-full px-8 py-6 text-lg shadow-lg shadow-primary/20">
                      Get Started Free
                    </Button>
                  </SignUpButton>
                </Show>
              </div>

              <div className="flex justify-center flex-col sm:flex-row items-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  No Credit Card Required
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Free Forever Plan
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Setup in 30 seconds
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>


      <footer className="border-t bg-muted/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <span className="text-xl font-bold tracking-tight">Beam</span>
            <p className="text-sm text-muted-foreground mt-1">
              The future of messaging, right at your fingertips.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <a 
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a 
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a 
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Support
            </a>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            2025 Beam . This is a Demo. We have no affiliations with any company or brands mentioned in video calling beam, any usage is purely educational and non-commercial.
          </p>

        </div>
      </div>
      </footer>
    </div>
  );
}
