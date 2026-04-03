export type Assignment = {
  id: string;
  course: string;
  title: string;
  dueDate: string;
};

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

const assignments: Assignment[] = [
  // {
  //   id: "ml-assignment-1",
  //   course: "Μηχανική Μάθηση",
  //   title: "First assignment",
  //   dueDate: "2026-03-30",
  // },
  {
    id: "eas-assignment-420",
    course: "Ευφυή Αυτόνομα Συστήματα",
    title: "Assignment 420 (3)",
    dueDate: "2026-04-21",
  },
  {
    id: "pattern-recognition-assignment-2",
    course: "Αναγνώριση Προτύπων - Στατιστική Μάθηση",
    title: "Easy stuff!",
    dueDate: "2026-04-19",
  },
  {
    id: "reinforcement-learning-assignment-1",
    course: "Υπολογιστική Νοημοσύνη – Βαθιά Ενισχυτική Μάθηση",
    title: "Επίλυση προβλήματος βαθιάς ενισχυτικής μάθησης",
    dueDate: "2026-05-23",
  },
   {
    id: "crypto-1",
    course: "Θεμελιώσεις Κρυπτογραφίας",
    title: "Πρώτο πρότζεκτ (2μ), όχι καθορισμένη Ημ.Παρ.",
    dueDate: "2026-04-10",
  },
  {
    id: "machine learning-assignment-2",
    course: "Μηχανική Μάθηση",
    title: "Second assignment",
    dueDate: "2026-05-01",
  },
  {
    id: "crypto-2",
    course: "Θεμελιώσεις Κρυπτογραφίας",
    title: "Πρώτο πρότζεκτ (2μ), όχι καθορισμένη Ημ.Παρ.",
    dueDate: "2026-04-10",
  },
];

export function getDueAssignments(): Assignment[] {
  return [...assignments].sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
}

export function formatDaysLeft(dueDate: string, now: Date = new Date()): string {
  const match = dueDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return "";
  }

  const [, year, month, day] = match;
  const dueDayNumber = Math.floor(
    Date.UTC(Number(year), Number(month) - 1, Number(day)) / MILLISECONDS_PER_DAY
  );
  const todayDayNumber = Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / MILLISECONDS_PER_DAY
  );

  const daysLeft = dueDayNumber - todayDayNumber;

  if (daysLeft > 0) {
    return `(${daysLeft} ${daysLeft === 1 ? "day" : "days"} left)`;
  }

  if (daysLeft === 0) {
    return "(due today)";
  }

  const overdueDays = Math.abs(daysLeft);
  return `(${overdueDays} ${overdueDays === 1 ? "day" : "days"} overdue)`;
}
