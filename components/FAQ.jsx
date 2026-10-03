"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const questions = [
  {
    question: "What is the registration fee?",
    answer: "The registration fee is free of cost. The only thing you need to bring is your idea and your team.",
  },
  {
    question: "Who can participate?",
    answer: "UG, PG, and Diploma engineering or technology students can participate in Axis HackSprint 2.0.",
  },
  {
    question: "Is hardware allowed?",
    answer: "No. This is a software-only hackathon, so every solution must be built in software.",
  },
  {
    question: "Are inter-college teams allowed?",
    answer: "Yes. Collaboration across institutes is encouraged. Gather your coven and build together.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const reducedMotion = useReducedMotion();

  return (
    <section className="faq scroll-mt-20 bg-transparent" id="faq" aria-labelledby="faq-title">
      <div className="faq__inner">
        <motion.header
          className="faq__header"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
        >
          <p className="eyebrow">Answers from the other side</p>
          <h2 id="faq-title">Mystic Inquiries <span>&amp; Riddles</span></h2>
        </motion.header>

        <div className="faq__list">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index + 1}`;
            return (
              <article className={`faq-item !backdrop-blur-2xl${isOpen ? " faq-item--open" : ""}`} key={item.question}>
                <h3>
                  <button
                    className="faq-item__question"
                    type="button"
                    id={`faq-question-${index + 1}`}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="faq-item__number">0{index + 1}</span>
                    <span>{item.question}</span>
                    <motion.span className="faq-item__toggle" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} aria-hidden="true">+</motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      className="faq-item__answer-wrap"
                      role="region"
                      aria-labelledby={`faq-question-${index + 1}`}
                      initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.2, 0.75, 0.25, 1] }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
