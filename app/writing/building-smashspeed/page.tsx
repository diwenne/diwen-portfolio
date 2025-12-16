'use client';

import Link from 'next/link';
import { Footer } from '@/components/footer';

export default function BuildingSmashspeedPost() {
    return (
        <main className="relative">
            <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
                <div className="pt-16 sm:pt-24" />

                {/* Breadcrumb */}
                <div className="text-sm sm:text-[0.95rem] leading-relaxed mb-8">
                    <Link href="/writing" className="hover-underline-nudge">Writing</Link>
                    <span className="mx-2 text-neutral-400 dark:text-neutral-600">/</span>
                    <span>Building Smashspeed</span>
                </div>

                <article className="case-study">
                    <header>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                Case Study
                            </span>
                            <span className="text-xs text-neutral-500">August 18, 2025 • 8 min read</span>
                        </div>
                        <h1>How I Built a Viral iOS App from Scratch</h1>
                        <p className="subtitle">
                            From idea to 45K users: the technical journey of building Smashspeed.
                        </p>
                    </header>

                    <section>
                        <h2>The Spark</h2>
                        <p>
                            It started at my local gym. I was watching tennis players through the glass wall,
                            and noticed something that bothered me: they had access to all kinds of professional
                            analytics tools—radar guns, swing analyzers, ball-tracking systems. Meanwhile,
                            badminton players had almost nothing.
                        </p>
                        <p>
                            This gap felt unfair. Badminton is one of the fastest racquet sports in the world,
                            with smash speeds regularly exceeding 300 km/h at the professional level. Yet
                            measuring this critical metric required expensive radar equipment that most
                            players couldn't afford.
                        </p>
                        <p>
                            What if I could build something that used just a smartphone camera?
                        </p>
                    </section>

                    <section>
                        <h2>The Technical Challenge</h2>
                        <p>
                            Detecting a shuttlecock in video is surprisingly hard. Unlike a tennis ball or
                            basketball, a shuttlecock is small, moves incredibly fast, and can blur into
                            near-invisibility in standard 60fps footage.
                        </p>
                        <p>
                            I needed to solve several problems:
                        </p>
                        <ul>
                            <li><strong>Detection:</strong> Train a model to find the shuttlecock in each frame</li>
                            <li><strong>Tracking:</strong> Connect detections across frames to form trajectories</li>
                            <li><strong>Speed calculation:</strong> Convert pixel movement to real-world speed</li>
                            <li><strong>Mobile deployment:</strong> Make it run fast enough on a phone</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Building the Dataset</h2>
                        <p>
                            There were no public datasets for shuttlecock detection. I had to build my own
                            from scratch—scraping match footage, filming at local clubs, and manually
                            annotating over 15,000 images.
                        </p>
                        <p>
                            This was tedious work, but it taught me an important lesson: <em>in machine
                                learning, data quality matters more than model architecture.</em> Every hour
                            spent on careful annotation paid off in model performance.
                        </p>
                    </section>

                    <section>
                        <h2>The Model</h2>
                        <p>
                            I chose YOLOv5s for its balance of speed and accuracy. The "s" (small) variant
                            was crucial—it needed to run in real-time on mobile without draining the battery.
                        </p>
                        <p>
                            Training happened on NVIDIA A100 GPUs via Google Cloud. After extensive
                            hyperparameter tuning, I achieved 93% detection accuracy on the test set.
                        </p>
                        <p>
                            But detection alone wasn't enough. Frame-by-frame predictions were noisy, with
                            occasional missed detections creating gaps in the trajectory. I added a Kalman
                            filter to smooth predictions and fill in missing detections—a classic technique
                            that proved essential for reliable speed calculations.
                        </p>
                    </section>

                    <section>
                        <h2>Going Viral</h2>
                        <p>
                            I launched Smashspeed on the App Store, and honestly, I couldn't have done it
                            alone. I'm incredibly grateful to my friends who helped spread the word—they
                            jumped in to help with marketing, creating content, and getting the app in
                            front of the badminton community. Their support turned what could have been
                            a quiet launch into something much bigger.
                        </p>
                        <p>
                            A huge turning point came when we partnered with <a href="https://instagram.com/badmintonfamly" target="_blank" rel="noreferrer" className="hover-underline-nudge">Badmintonfamly</a> on
                            Instagram—my childhood badminton idol. Seeing them use and promote Smashspeed
                            was surreal. They helped introduce the app to their massive audience, and from
                            there, other badminton influencers started picking it up too. The community
                            effect was incredible.
                        </p>
                        <p>
                            Within weeks, the app hit #1 in Taiwan's Sports category. Videos of players
                            testing their smash speeds went viral, accumulating over 5 million views.
                            Users were sending me recordings from tournaments, casual games, and training
                            sessions around the world.
                        </p>
                        <p>
                            Then came the moment I never expected: <strong>Viktor Axelsen</strong>—Olympic
                            gold medalist and World Champion—noticed the app on TikTok after one of our viral
                            posts and requested an Android version. That was the push I needed. I quickly
                            recruited friends to help build out the Android version for a rapid release. What
                            started as a solo iOS project suddenly became a cross-platform team effort.
                        </p>
                        <p>
                            Today, over 45,000 people have used Smashspeed to measure their smash speeds.
                            What started as a side project became something that genuinely helps players
                            improve—and I owe so much of that success to the people who believed in it
                            and helped along the way.
                        </p>
                    </section>

                    <section>
                        <h2>Lessons Learned</h2>
                        <p>
                            <strong>1. Solve your own problems.</strong> I built Smashspeed because I
                            wanted it to exist. That authenticity showed in the product.
                        </p>
                        <p>
                            <strong>2. Don't underestimate classical techniques.</strong> The Kalman
                            filter, developed in the 1960s, was just as important as the neural network.
                        </p>
                        <p>
                            <strong>3. Ship early.</strong> The first version was rough, but real user
                            feedback taught me more than months of solo development would have.
                        </p>
                        <p>
                            <strong>4. Technology should disappear.</strong> Users don't care about
                            YOLOv5 or Kalman filters. They care about getting an accurate speed reading
                            quickly and easily.
                        </p>
                    </section>

                    <section>
                        <h2>What's Next</h2>
                        <p>
                            I'm continuing to improve Smashspeed—expanding the training dataset, exploring
                            newer architectures, and adding features users have requested. I'm also
                            working on related projects that apply similar techniques to other sports.
                        </p>
                        <p>
                            If you're interested in the technical details, I've published my research
                            on <a href="https://www.arxiv.org/abs/2509.05334" target="_blank" rel="noreferrer" className="hover-underline-nudge">arXiv</a>,
                            and the app is available on the <a href="https://smashspeed.ca" target="_blank" rel="noreferrer" className="hover-underline-nudge">App Store</a> and <a href="https://smashspeed.ca" target="_blank" rel="noreferrer" className="hover-underline-nudge">Google Play</a>.
                        </p>
                    </section>
                </article>

                {/* Back Navigation */}
                <div className="my-6 border-t border-neutral-200 dark:border-neutral-700 pt-6">
                    <div className="flex items-center gap-4">
                        <Link href="/writing" className="hover-underline-nudge font-extralight text-sm sm:text-[0.95rem]">
                            ← Back to Writing
                        </Link>
                        <span className="text-neutral-400">|</span>
                        <Link href="/" className="hover-underline-nudge font-extralight text-sm sm:text-[0.95rem]">
                            ← Back to Home
                        </Link>
                    </div>
                </div>

                <Footer />
            </div>
        </main>
    );
}
