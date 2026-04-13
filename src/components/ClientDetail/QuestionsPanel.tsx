import { useState, useEffect } from 'react';
import type { Question } from '../../types';
import QuestionRow from './QuestionRow';

interface QuestionsPanelProps {
  questions: Question[];
}

/**
 * QuestionsPanel - Open questions list with add button and status toggles
 * Local state only (no persistence in demo)
 * Add button is non-functional placeholder
 */
function QuestionsPanel({ questions }: QuestionsPanelProps) {
  // Local state for question status (demo mode)
  const [questionStates, setQuestionStates] = useState<Map<string, Question>>(new Map());

  // Initialize local state from questions prop
  useEffect(() => {
    const stateMap = new Map<string, Question>();
    questions.forEach((q) => stateMap.set(q.id, q));
    setQuestionStates(stateMap);
  }, [questions]);

  const handleToggleStatus = (questionId: string) => {
    setQuestionStates((prev) => {
      const newMap = new Map(prev);
      const question = newMap.get(questionId);
      if (question) {
        const newStatus = question.status === 'open' ? 'resolved' : 'open';
        newMap.set(questionId, {
          ...question,
          status: newStatus,
          resolved_by: newStatus === 'resolved' ? 'Demo User' : undefined,
          resolved_at: newStatus === 'resolved' ? new Date().toISOString() : undefined,
        });
      }
      return newMap;
    });
  };

  const questionList = Array.from(questionStates.values());
  const openQuestions = questionList.filter((q) => q.status === 'open');
  const resolvedQuestions = questionList.filter((q) => q.status === 'resolved');

  return (
    <div className="questions-panel">
      <div className="questions-panel__header">
        <h3 className="questions-panel__title">
          Questions
          {openQuestions.length > 0 && (
            <span className="questions-panel__count">{openQuestions.length} open</span>
          )}
        </h3>
        <button
          className="questions-panel__add-btn"
          onClick={() => alert('Add question feature coming soon (demo placeholder)')}
        >
          + Add Question
        </button>
      </div>

      <div className="questions-panel__list">
        {openQuestions.length === 0 && resolvedQuestions.length === 0 ? (
          <div className="questions-panel__empty">No questions for this period</div>
        ) : (
          <>
            {openQuestions.map((question) => (
              <QuestionRow
                key={question.id}
                id={question.id}
                text={question.text}
                status={question.status}
                resolvedBy={question.resolved_by}
                resolvedAt={question.resolved_at}
                onToggleStatus={handleToggleStatus}
              />
            ))}
            {resolvedQuestions.map((question) => (
              <QuestionRow
                key={question.id}
                id={question.id}
                text={question.text}
                status={question.status}
                resolvedBy={question.resolved_by}
                resolvedAt={question.resolved_at}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default QuestionsPanel;
