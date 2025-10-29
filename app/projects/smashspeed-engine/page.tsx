'use client';

import Link from 'next/link';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import { Footer } from '@/components/footer';

export default function SmashspeedCaseStudy() {
  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Breadcrumb */}
        <div className="text-sm sm:text-[0.95rem] leading-tight mb-6">
          <Link href="/projects" className="hover-underline-nudge">Projects</Link>
          <span className="mx-2 text-neutral-400 dark:text-neutral-600">/</span>
          <span>Smashspeed Engine</span>
        </div>

        <article className="case-study">
          <header>
            <h1>Smashspeed ML Engine</h1>
            <p className="subtitle">
              Building a high-performance, on-device shuttlecock tracking and speed calculation pipeline.
            </p>
          </header>

          <section>
            <h2>Project Overview</h2>
            <div className="overview-grid">
              <div className="overview-item">
                <h3>Duration</h3>
                <p>May 2025 - Present</p>
              </div>
              <div className="overview-item">
                <h3>Role</h3>
                <p>Machine Learning Engineer</p>
              </div>
              <div className="overview-item">
                <h3>Live App</h3>
                <a
                  href="https://smashspeed.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-underline-nudge inline-flex items-center gap-2 text-sm"
                >
                  <FaGlobe />
                  <span>smashspeed.ca</span>
                </a>
              </div>
              <div className="overview-item">
                <h3>Source Code</h3>
                <a
                  href="https://github.com/diwenne/smashspeed_ios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-underline-nudge inline-flex items-center gap-2 text-sm"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
              </div>
              <div className="overview-item full-width">
                <h3>Responsibilities</h3>
                <ul>
                  <li>Data Collection & Annotation</li>
                  <li>Model Training & Evaluation</li>
                  <li>Algorithm Implementation</li>
                  <li>Mobile Deployment Optimization</li>
                </ul>
              </div>
              <div className="overview-item full-width">
                <h3>Tech Stack</h3>
                <p>Swift (iOS), CoreML, Python, PyTorch, YOLOv5, Kalman Filters</p>
              </div>
            </div>
          </section>

          <section>
            <h2>Project Vision</h2>
            <p>
              The vision behind the Smashspeed engine was to democratize performance analytics in badminton. The idea first sparked one day while I was at the gym, watching the tennis courts through the glass wall. I noticed how tennis players have access to a wide range of professional tools—radar guns, swing analyzers, and ball-tracking systems—while badminton players rarely have anything close to that level of accessible technology. The gap felt unfair, especially given how much precision and speed matter in badminton.
            </p>
            <p>
              I began brainstorming ways to bridge this gap, asking myself: how could we give everyday badminton players access to the same kind of data-driven performance feedback as elite tennis players, but without the high cost? Smash speed, in particular, stood out as a critical metric that influences both technique and competitive edge. However, measuring it has traditionally required expensive, specialized radar equipment—well out of reach for most amateurs.
            </p>
            <p>
              This was where the concept for Smashspeed began to take shape: a robust, purely software-based solution that could deliver accurate speed readings using only a standard smartphone camera. By removing the need for costly hardware and placing the technology directly in players' pockets, the goal became clear—empower athletes at all levels to track, understand, and improve their performance anytime, anywhere.
            </p>
          </section>

          <section>
            <h2>My Process</h2>

            <h3>1. Foundational Knowledge</h3>
            <p>
              Before tackling this project, I built a strong theoretical foundation through two major programs. First, I completed the 10-week Machine Learning Specialization from Stanford University, taught by Professor Andrew Ng.
            </p>
            <p>
              The Stanford program covered essential machine learning skills: coding convolutional neural networks from scratch, performing backpropagation calculus by hand, hyperparameter tuning, regularization, and optimization techniques. I explored architectures including CNNs, RNNs, attention mechanisms, transformers, and sequence models, while also learning how to structure and manage large ML projects effectively.
            </p>
            <p>
              In parallel, I completed <em>Math for Machine Learning</em> by Imperial College London, taught by David Dye, Samuel J. Cooper, and Freddie Page. This course gave me a deep understanding of the linear algebra and multivariable calculus underlying neural networks, from matrix operations to gradient-based optimization in high-dimensional spaces.
            </p>
            <p>
              Together, these programs not only gave me the technical skills to design and deploy modern ML systems, but also a historical and conceptual perspective on the evolution of the field and its key figures.
            </p>

            <h3>2. Data Collection & Annotation</h3>
            <p>
              The foundation of any reliable detection model is a high-quality dataset, and for Smashspeed, this meant going far beyond stock footage or generic sports videos. Because this project was so niche, there were no publicly available datasets or pretrained models for shuttlecock detection. That meant I had to build everything from the ground up.
            </p>
            <p>
              I developed custom Python scripts to scrape and extract relevant badminton match footage from across the internet, filtering for clips that captured clear shuttle trajectories under varied conditions. To ensure diversity and realism, I also traveled to multiple badminton clubs and tournaments to record my own footage. This gave me access to unique camera angles, lighting setups, court colors, and player skill levels—conditions that a purely online dataset could never fully capture. By blending professional match clips with real-world amateur footage, I was able to make the model robust across different play environments.
            </p>
            <p>
              Once gathered, I used Roboflow to organize, preprocess, and manage the dataset. This included standardizing image sizes, augmenting data to simulate motion blur and varied lighting, and splitting the dataset into training, validation, and testing sets. In total, I manually annotated over <strong>3,000 images of shuttlecocks</strong> from these diverse sources, creating a rich and balanced dataset capable of supporting a model that generalizes well to footage from everyday users.
            </p>

            <h3>3. Model Training (YOLOv5s)</h3>
            <p>
              For the detection task, I selected the <strong>YOLOv5</strong> (You Only Look Once) architecture developed by Ultralytics, opting for the <strong>YOLOv5s</strong> variant. This small but powerful model offered the ideal balance between inference speed and detection accuracy, making it perfect for real-time execution on mobile devices. I specifically chose YOLOv5s because it is well-suited to achieving high performance even with a relatively limited dataset—a crucial factor given the niche nature of shuttlecock detection and the absence of large-scale public datasets.
            </p>
            <p>
              To train the model, I leveraged <strong>Google Cloud Platform (GCP)</strong>, utilizing a high-performance compute instance equipped with <strong>NVIDIA A100 GPUs</strong> and the <strong>CUDA</strong> toolkit for accelerated processing. Trained in PyTorch on my custom dataset, this setup enabled rapid experimentation and tuning, allowing YOLOv5s to consistently deliver high precision in localizing the shuttlecock's bounding box across frames, even under challenging conditions like motion blur and varied lighting.
            </p>

            <h3>4. Trajectory Smoothing & Post-Processing (Kalman Filter)</h3>
            <p>
              Object detection alone is not enough, as a model can occasionally miss a detection in a frame, leading to gaps and erratic readings. To address this, I implemented a <strong>Kalman Filter</strong> to predict the shuttlecock's expected position in the next frame based on its current trajectory. When YOLOv5s outputs a detection, the Kalman Filter uses it to update its prediction; if the model fails to detect, the filter falls back to its own prediction to maintain a smooth, continuous path.
            </p>
            <p>
              To further refine accuracy, I developed a <strong>combined scoring system</strong> for selecting the final bounding box. This system weighted the YOLO model's confidence score at <strong>0.3</strong> and the inverse of the Euclidean distance between the model's prediction and the Kalman prediction at <strong>0.7</strong>. I arrived at this balance after extensive experimentation with different ratios, finding 0.3–0.7 to yield the most consistent results in real-world testing.
            </p>
            <p>
              Additionally, I deliberately set YOLO's <strong>confidence threshold</strong> extremely low at <strong>0.10</strong> because shuttlecocks are notoriously difficult to detect, and even low-confidence predictions could be correct. As a safeguard, any detection that resulted in an <strong>unreasonable calculated speed</strong> was automatically discarded, preventing outliers from skewing the final speed measurement.
            </p>

            <h3>5. Speed Calculation</h3>
            <p>
              The calibrated pixel-to-meter ratio is applied to the shuttlecock's displacement between consecutive frames.
              Dividing this real-world distance by the time elapsed between frames yields the shuttle's instantaneous speed in kilometers per hour.
              Additional filtering removes detections producing physically unrealistic speeds, ensuring accuracy and consistency.
            </p>

            <h3>6. Mobile Deployment & App Implementation</h3>
            <p>
              I translated the machine learning pipeline into <strong>Swift</strong> and implemented the interface using <strong>SwiftUI</strong>,
              drawing on principles from my <strong>Google UX Design</strong> training to ensure clarity and usability.
              The trained PyTorch model was converted to <strong>Core ML</strong> and exported as a <strong>.mlpackage</strong> for optimized, on-device inference.
              The iOS app integrates efficient video processing, real-time overlay rendering, and seamless model inference for a smooth user experience.
            </p>
          </section>

          <section>
            <h2>Challenges & Solutions</h2>
            <ol>
              <li>
                <strong>Model Conversion & Inference:</strong> One of the first major hurdles was making the AI model work on an iPhone. The process of converting the model weights from PyTorch's `.pt` format to Apple's `.mlpackage` format was challenging and required careful management of model layers and output formats to ensure compatibility and performance.
              </li>
              <li>
                <strong>Training & Inference Mismatch:</strong> For a long time, the model's accuracy was impeded by a subtle bug. The model was trained on images that were letterboxed (padded with black bars to maintain aspect ratio), but the inference logic in the app was using warping (stretching the image). This mismatch confused the model. Correcting the inference pre-processing to also use letterboxing significantly improved detection accuracy.
              </li>
              <li>
                <strong>Balancing UX and Post-Processing:</strong> The raw output from the model was noisy. I had to find the right balance of post-processing logic to create a smooth user experience. It was a challenge to determine which controls were necessary for users to correct errors and which were overkill. This involved implementing and testing various filters and heuristics to supplement the model's predictions without overwhelming the user.
              </li>
            </ol>
          </section>

          <section>
            <h2>Takeaway</h2>
            <p>
              <strong>Real-World Impact:</strong> This was my first time building a consumer product that directly addressed a real need in my community.
              It showed me how technology can go beyond a project—it can be a tool that genuinely helps people.
            </p>
            <p>
              <strong>Practical Machine Learning:</strong> The project let me put my ML knowledge into practice in a real-world setting, dealing with the
              messy realities of deployment, optimization, and user expectations.
            </p>
            <p>
              <strong>Key Technical Lessons:</strong> I learned how to balance accuracy with speed, why lightweight architectures like YOLOv5s matter,
              and how classical methods like the Kalman Filter can work hand-in-hand with deep learning to create more robust systems.
            </p>
            <p>
              <strong>Biggest Takeaway:</strong> Technology—when built with purpose—can make a tangible difference, transforming theory into a tool
              that people actually use.
            </p>
          </section>

          <section>
            <h2>Next Steps</h2>
            <ul>
              <li>Expand the training dataset with diverse, user-generated badminton footage to improve robustness across environments, skill levels, and camera setups.</li>
              <li>Continue refining YOLOv5s weights and Kalman Filter tuning to reduce false positives and maintain smooth, accurate trajectory tracking.</li>
              <li>Investigate alternative architectures—such as YOLOv8, transformer-based detectors, or attention-augmented vision models—that can leverage temporal context and previous frame information for more reliable tracking.</li>
              <li>Implement active learning pipelines to automatically identify and prioritize difficult samples for annotation and retraining.</li>
              <li>Explore advanced Core ML optimizations—such as pruning, quantization, and neural architecture search—to further reduce model size and inference time.</li>
            </ul>
          </section>
        </article>

        <Footer />
      </div>
    </main>
  );
}
