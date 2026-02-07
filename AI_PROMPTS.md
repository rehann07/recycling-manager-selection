
# AI Prompts & Mock Evaluation Logic  
**Role:** Senior Recruitment Specialist for GreenCycle Production (GCP)

This document defines structured AI evaluation prompts and mock JSON responses for assessing candidates applying for the **Recycling Production Line Manager** role.

---

## 1. Crisis Management Evaluation

### Context
The production line has jammed, causing a potential overflow of glass shards near a high-traffic worker zone.  
The candidate must explain their **immediate reaction**.

### Prompt 
```
You are an expert Evaluator for a Recycling Facility.

Analyze the following candidate response to a crisis scenario involving a glass conveyor jam.

**Criteria for Scoring (0–100):**
- Immediate Safety Protocol (stopping the line, securing the area)
- Communication (alerting maintenance and team)
- Root Cause Analysis (preventing recurrence)

**Candidate Response:**  
`"{{candidate_response}}"`

### Output Requirement
Return **ONLY** a valid JSON object in this format:

{
  "category": "Crisis Management",
  "score": <integer_0_to_100>,
  "analysis": "<short_one_sentence_summary>",
  "keywords_detected": ["<keyword1>", "<keyword2>"]
}
```

### Mock AI Response (JSON)

Use this data to mock the API response in your application.

```json
{
  "category": "Crisis Management",
  "score": 88,
  "analysis": "Candidate prioritized worker safety immediately but lacked detail on long-term prevention protocols.",
  "keywords_detected": ["Emergency Stop", "Safety First", "Maintenance Call"]
}
```

---

## 2. Sustainability Knowledge Evaluation

### Context

The plant needs to reduce its carbon footprint by **15% this year** without reducing output.
The candidate is asked to propose **one high-impact initiative**.

### Prompt
```
You are a Sustainability Officer.

Evaluate the technical feasibility and impact of the candidate's proposal to reduce carbon footprint.

**Criteria for Scoring (0–100):**

* Feasibility (Can it be implemented in a standard facility?)
* Impact (Is the 15% reduction realistic?)
* Technical Depth (Understanding of energy loops, recycling efficiency, or renewable integration)

**Candidate Proposal:**
`"{{candidate_proposal}}"`

### Output Requirement

Return **ONLY** a valid JSON object in this format:

{
  "category": "Sustainability Knowledge",
  "score": <integer_0_to_100>,
  "viability": "<High|Medium|Low>",
  "feedback": "<short_critique>"
}
```

### Mock AI Response (JSON)

Use this data to mock the API response in your application.

```json
{
  "category": "Sustainability Knowledge",
  "score": 92,
  "viability": "High",
  "feedback": "Excellent proposal focusing on closed-loop water systems; highly effective for this specific facility type."
}
```

---

## 3. Team Motivation Evaluation

### Context

Turnover is high on the night shift due to repetitive tasks.
The candidate is asked how they would improve **morale and retention**.

### Prompt 
```

You are an HR Psychologist specializing in blue-collar workforce retention.

Assess the candidate's strategy for improving night-shift morale.

**Criteria for Scoring (0–100):**

* Empathy & Listening (Understanding the root cause)
* Incentive Structure (Gamification, bonuses, or rotation)
* Leadership Tone (Supportive vs. Authoritative)

**Candidate Strategy:**
`"{{candidate_strategy}}"`

### Output Requirement

Return **ONLY** a valid JSON object in this format:

{
  "category": "Team Motivation",
  "score": <integer_0_to_100>,
  "leadership_style": "<Democratic|Autocratic|Laissez-faire>",
  "strengths": ["<strength1>", "<strength2>"]
}
```

### Mock AI Response (JSON)

Use this data to mock the API response in your application.

```json
{
  "category": "Team Motivation",
  "score": 74,
  "leadership_style": "Democratic",
  "strengths": ["Active Listening", "Shift Rotation Plan"]
}
```