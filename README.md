This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Animation Mechanics: Works Section

The **Works** section features a sophisticated "Project Reveal" sequence orchestrated with **GSAP ScrollTrigger** and **Framer Motion**.

### 1. Scroll Pinning & Setup
The entire section is "locked" in the viewport using GSAP's `pin: true`. This allows the animation to progress based on the user's scroll speed (`scrub: 1`) without the page moving away.

### 2. The Animation Phases

#### 🚀 Phase 1: The Landing
The Spaceship enters from the top of the screen (`-100vh`) and settles into a "scanning" position. Once in place, the **Light Beam** activates, scaling down to the bottom of the viewport.

#### 🔍 Phase 2: Sequential Reveal
As you scroll, the GSAP timeline iterates through the project cargo:
- **Arrival**: Project cards move from the background (`z: -100`) to the foreground, fading in and coming into focus (blur removal).
- **Scanner View**: Each project image features a looping horizontal scanner line to emphasize the "digital inspection" theme.
- **Stacking**: Previous projects are scaled down and pushed into the background (`z: -200`) with a blur filter, creating a cinematic depth-of-field effect.

#### ⚡ Phase 3: Dynamic Interaction
- **Ship Movement**: The spaceship slowly descends during the reveal to guide the user's eye.
- **Engine Thrusters**: High-frequency Framer Motion flickers on the engine output make the ship feel powered and alive.

#### 🌌 Phase 4: Blast Off
Once the final project is viewed, the ship accelerates rapidly toward the viewer (`rotateX` and `y` movement), clearing the stage for the next section.

### Technical Stack
- **GSAP & ScrollTrigger**: Handles the complex timeline orchestration and scroll interaction.
- **Framer Motion**: Manages micro-animations (engines, scanner lines) and CSS-variable-based transitions.
- **CSS Perspective**: Applied to the container to enable realistic 3D depth during the "cargo" transitions.

