import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { messages, message, userName } = await req.json();

    if (!message && (!messages || messages.length === 0)) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const userQuery = message || messages[messages.length - 1]?.message || '';
    const displayName = userName || 'Student';
    const firstName = displayName.split(' ')[0];

    // Build dynamic system prompt
    const SYSTEM_PROMPT = `You are "EduSphere AI", a highly advanced, supportive academic assistant and student mentor for Delhi Institute of Technology (DIT).
You are chatting with ${displayName}, a Semester VI Computer Science and Engineering student.
Keep your answers extremely helpful, clean, visually organized (using bullet points, bold text, and code blocks where appropriate), and encouraging.
Personalized Student Context:
- Current semester: VI
- Enrolled courses: Data Structures & Algorithms (CS601), Operating Systems (CS602), Database Management Systems (CS603), Computer Networks (CS604), Software Engineering (CS605)
- Weak areas: Computer Networks (attendance is 75%, internal marks are 29/50 - Danger status) and DBMS internals (37/50 - At Risk).
- Strengths: Software Engineering (49/50), DSA (46/50).
- Placements: Applied to Infosys (Offer Received: ₹6.5 LPA) and Amazon SDE Intern (Applied, Technical Round on June 20).`;

    const apiKey = process.env.GEMINI_API_KEY;
    const isDemo = !apiKey || apiKey.includes('your_gemini_api_key_here');

    if (!isDemo) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey as string);
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction: SYSTEM_PROMPT
        });

        let promptText = '';
        if (messages && messages.length > 1) {
          promptText += 'Previous Conversation:\n';
          messages.slice(-6, -1).forEach((msg: any) => {
            const roleName = msg.role === 'ai' ? 'EduSphere AI' : firstName;
            promptText += `${roleName}: ${msg.message}\n`;
          });
        }
        promptText += `\n${firstName}: ${userQuery}\nEduSphere AI:`;

        const result = await model.generateContent(promptText);
        const responseText = result.response.text();

        return NextResponse.json({ message: responseText, isDemo: false });
      } catch (err: any) {
        console.warn('Real Gemini API call failed. Falling back to Demo Mode:', err);
      }
    }

    // --- Demo Mode Responder (Smart Educational Fallback) ---
    const queryLower = userQuery.toLowerCase();
    let reply = '';

    if (queryLower.includes('summarize') || queryLower.includes('summary')) {
      const lectureMatch = userQuery.match(/lecture:\s*"([^"]+)"/i) || userQuery.match(/lecture:\s*([^\n,]+)/i);
      const courseMatch = userQuery.match(/course:\s*"([^"]+)"/i) || userQuery.match(/course:\s*([^\n,]+)/i);
      const lectureName = lectureMatch ? lectureMatch[1].trim() : 'Active Lecture';
      const courseName = courseMatch ? courseMatch[1].trim() : 'Current Course';

      reply = `### AI Lecture Summary: ${lectureName} 📚
*Course: ${courseName}*

This lecture covers critical core concepts and practical implementations:

*   **Key Concept 1: Structural Foundations**
    *   Understanding the design principles, state interfaces, and basic lifecycle hooks.
    *   Verifying runtime constraints and bounds during operations.
*   **Key Concept 2: Optimization Strategies**
    *   Identifying potential bottlenecks in complexity and execution flows.
    *   Implementing modular layouts to minimize resource overheads.
*   **Key Concept 3: Integration Checklist**
    *   Connecting auxiliary packages and validating linked runtime services.
    *   Testing boundary conditions to ensure stable execution.

*Next Steps:* Review the recommended code repository and solve the module assignments!`;
    } else if (queryLower.includes('watching the lecture') || queryLower.includes('study coach') || queryLower.includes('current lecture') || queryLower.includes('context: i am currently watching')) {
      reply = `Hi ${firstName}! I see you are watching the lecture on this topic.

Here is a quick study tip to keep in mind:
*   Make sure to check the **Resources** tab for the lecture slides and sample codebase.
*   Pay close attention to how the state is structured and updated.
*   Try writing a short snippet yourself in the browser terminal or compiler tool.

What specific doubt do you have about this section? I'm here to explain any terminology or walk through code!`;
    } else if (queryLower.includes('revision') || queryLower.includes('plan') || queryLower.includes('study')) {
      reply = `Here is your customized **7-Day Revision Plan** for **Machine Learning & Core CS** subjects, ${firstName}:

*   **Day 1-2: Core Algorithms (DSA)**
    *   Review Heap Sort, Red-Black Trees, and Graph Traversal (DFS/BFS).
    *   Solve 3 mock problems on dynamic programming.
*   **Day 3: Operating Systems**
    *   Focus on **Page Replacement Algorithms** (LRU, FIFO) and Semaphores/Mutexes.
*   **Day 4-5: Computer Networks (⚠️ Priority)**
    *   Since your internals are currently **29/50**, study TCP/IP vs OSI model layers, congestion control, and subnetting.
    *   *Tip:* Try to attend all remaining lectures to lift your 75% attendance back up!
*   **Day 6: Database Management**
    *   Revisit **Transaction Isolation Levels** and Normalization (1NF to BCNF).
*   **Day 7: Final Sprint & Practice**
    *   Go through the mock exam question bank in the portal.

Feel free to ask for details on any specific topic!`;
    } else if (queryLower.includes('vanishing') || queryLower.includes('gradient') || queryLower.includes('relu') || queryLower.includes('deep learning')) {
      reply = `### The Vanishing Gradient Problem Explained 🧠

In deep neural networks, weights are updated using backpropagation where gradients are calculated via the **chain rule**:

$$\\frac{\\partial L}{\\partial W_1} = \\frac{\\partial L}{\\partial Y} \\times \\frac{\\partial Y}{\\partial X_n} \\times \\dots \\times \\frac{\\partial X_2}{\\partial X_1}$$

#### Why does it occur?
If we use activation functions like **Sigmoid** or **Tanh**, their derivative values are always less than $1$ (Sigmoid derivative peaks at $0.25$).
Multiplying many fractions less than $1$ repeatedly across deep layers causes the gradient to decrease exponentially toward $0$. As a result, the early layers learn extremely slowly or not at all.

#### How ReLU solves it:
The **Rectified Linear Unit (ReLU)** is defined as:
\`\`\`python
def relu(x):
    return max(0, x)
\`\`\`
Its derivative is:
*   **1** for $x > 0$
*   **0** for $x < 0$

Because the gradient is a constant **1** for all positive inputs, multiplying gradients across layers does not shrink the values! Gradients flow freely backward, resolving the vanishing gradient problem.

*Alternative solutions:* Leaky ReLU, batch normalization, and residual connections (ResNets).`;
    } else if (queryLower.includes('network') || queryLower.includes('subnet') || queryLower.includes('ip') || queryLower.includes('danger')) {
      reply = `${firstName}, let's address your **Computer Networks (CS604)** standing immediately.
You are currently at **29/50** for internals, which puts you in the **Danger** zone. Here is a quick study guide on critical exam topics to secure a strong final grade:

1.  **OSI Model vs. TCP/IP Protocol Suite**
    *   Understand the function of each layer (Physical, Data Link, Network, Transport, Session, Presentation, Application).
    *   *Key memory hook:* "Please Do Not Touch Steve's Pet Alligator" (Physical to Application).
2.  **IP Addressing & Subnetting**
    *   Learn how to calculate subnet masks, broadcast addresses, and the number of usable hosts.
    *   Review Classless Inter-Domain Routing (CIDR) notation.
3.  **Transport Layer Protocols**
    *   **TCP (Transmission Control Protocol):** Connection-oriented, reliable, employs 3-way handshake (\`SYN\` $\\rightarrow$ \`SYN-ACK\` $\\rightarrow$ \`ACK\`), flow control, and sliding window.
    *   **UDP (User Datagram Protocol):** Connectionless, fast, unreliable ("fire and forget"), used in streaming.

Would you like me to generate a set of practice questions on subnetting to boost your confidence?`;
    } else if (queryLower.includes('placement') || queryLower.includes('intern') || queryLower.includes('amazon') || queryLower.includes('infosys')) {
      reply = `🎉 **Outstanding work on securing the Infosys Offer (₹6.5 LPA)!** This takes away a lot of pressure, but let's make sure you excel in your upcoming **Amazon SDE Internship interview** scheduled for **June 20**!

Here is a targeted preparation plan for Amazon:

1.  **Deep-dive into DSA**
    *   Amazon heavily tests Trees/Graphs (binary tree traversal, LCA, Dijkstra's algorithm), Heap/Priority Queues, and Dynamic Programming (knapsack, grid-based problems).
2.  **Amazon Leadership Principles (LPs)**
    *   This is highly unique to Amazon. At least 30-50% of the interview evaluates LPs like *Customer Obsession*, *Bias for Action*, *Ownership*, and *Deep Dive*.
    *   Format your stories using the **STAR Method** (Situation, Task, Action, Result).
3.  **System Design Basics**
    *   Review object-oriented design patterns (Singleton, Factory, Strategy) as well as horizontal vs vertical scaling.

Would you like to run a mock technical interview or practice behavioral questions?`;
    } else if (queryLower.includes('marks') || queryLower.includes('grade') || queryLower.includes('cgpa')) {
      reply = `Your academic status is **Good Standing** with a current CGPA of **8.2 / 10**!

Here is a quick diagnostic of your current Semester VI forecast:
*   **Software Engineering:** 49/50 (Internal Grade: **O**) - Exceptional performance!
*   **Data Structures & Algorithms:** 46/50 (Internal Grade: **A**) - Strong foundation.
*   **Operating Systems:** 39/50 (Internal Grade: **B+**) - Safe, but you can push for an A.
*   **DBMS:** 37/50 (Internal Grade: **B+**) - *At Risk*. A bit more focus in final exams is needed.
*   **Computer Networks:** 29/50 (Internal Grade: **B**) - ⚠️ *Danger*. Focus here heavily to avoid dropping your SGPA.

If you maintain your current projections, you are on track for an **8.41 SGPA** this semester, which will elevate your CGPA to **8.25**!`;
    } else if (queryLower.includes('ticket') || queryLower.includes('hall')) {
      reply = `${firstName}, your **Semester VI Examination Hall Ticket** is **Available** for preview and download!

### Hall Ticket Details 🎫
*   **Student Name:** ${displayName}
*   **Branch:** Computer Science & Engineering
*   **Semester:** VI (Sixth)
*   **Exam Centre:** DIT Main Campus (Examination Hall B)

### Semester VI Timetable 📅
1.  **CS601 — Data Structures & Algorithms:** June 10, 2026 (10:00 AM | Room: Hall B - R12)
2.  **CS602 — Operating Systems:** June 13, 2026 (10:00 AM | Room: Hall B - R12)
3.  **CS603 — Database Management:** June 16, 2026 (10:00 AM | Room: Hall A - R08)
4.  **CS604 — Computer Networks:** June 19, 2026 (2:00 PM | Room: Hall B - R12)
5.  **CS605 — Software Engineering:** June 22, 2026 (10:00 AM | Room: Hall A - R05)

### How to Download 📥
1.  Navigate to the **[Examinations Portal](/student/exams)**.
2.  In the top section, find the **Semester VI — Hall Ticket** card.
3.  Click **Preview** to inspect your data, or click the **Download Hall Ticket** button to instantly download your official PDF card.

⚠️ **Important Exam Guidelines:**
*   You **MUST** carry both your printed Hall Ticket and your physical DIT Student ID Card to the exam centre. No entry is permitted without both.
*   *Note:* Outstanding dues can cause administrative locks on your hall ticket. Ensure your **Development Fee of ₹12,000** (currently overdue) is cleared on the **[Fees Portal](/student/fees)** before the exams begin to prevent any restrictions.`;
    } else if (queryLower.includes('community') || queryLower.includes('channel') || queryLower.includes('forum') || queryLower.includes('member') || queryLower.includes('online') || queryLower.includes('chat') || queryLower.includes('message')) {
      reply = `${firstName}, here are the live details from your **DIT CS Community Forum**:

### 🟢 Online Members (5 Active)
*   **Dr. Priya Nair** (Faculty — Computer Science)
*   **Rohan Mehta** (Student — CS-A)
*   **Deepika Nair** (Student — CS-A)
*   **Anjali Singh** (Student — CS-A)
*   **${displayName}** (You — CS-B)

### 💬 Active Discussion Channels
*   **General:** \`#general\` (12 unread) • \`#announcements\` (3 unread — Official HOD updates)
*   **Courses:** \`#full-stack-dev\` (28 unread) • \`#dsa-help\` (7 unread) • \`#machine-learning\` (5 unread)
*   **Support:** \`#doubts-qa\` (15 unread) • \`#career-advice\` (0 unread)
*   **Community:** \`#project-showcase\` (22 unread) • \`#study-groups\` (Active Voice session)

### 📌 Recent Hot Topic in \`#dsa-help\`
*   **Preethi K:** *"Can anyone help me understand the difference between BFS and DFS in terms of space complexity?"*
*   **Dr. Priya Nair (Faculty):** *"BFS uses O(V) space due to the queue, while DFS uses O(H) where H is the height of the tree (O(log n) balanced, O(V) worst-case)."*
*   **${displayName} (You):** *"@Preethi K Also worth noting: DFS is better for pathfinding in mazes, BFS for shortest path in unweighted graphs!"*

You can jump right in, read the full log, and join the conversation in the **[Community Portal](/student/community)**!`;
    } else {
      reply = `Hello ${firstName}! I've parsed your query: "${userQuery}".

As your personal EduSphere mentor, how can I help you today? Here are some topics we can explore:
1.  **Subject Revision:** Get crisp explanations, python code walkthroughs, or study guides.
2.  **Interview Preparation:** Run a mock SDE interview for your upcoming **Amazon** round on June 20.
3.  **Grades Simulator:** Let's calculate what grades you need in final exams to score a >8.5 SGPA.
4.  **Academic Recovery:** Review key concepts in **Computer Networks** to lift your grade from Danger.

Just type in whatever you are working on, and we will break it down together!`;
    }

    return NextResponse.json({
      message: `${reply}\n\n*(EduSphere AI: Demo Mode)*`,
      isDemo: true
    });
  } catch (error: any) {
    console.error('Error in AI Chat route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
