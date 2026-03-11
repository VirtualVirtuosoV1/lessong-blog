export type Assignment = {
  id: string;
  course: string;
  title: string;
  dueDate: string;
};

const assignments: Assignment[] = [
  {
    id: "ml-assignment-1",
    course: "Μηχανική Μάθηση",
    title: "First assignment",
    dueDate: "2026-03-30",
  },
  {
    id: "eas-assignment-2",
    course: "Ευφυή Αυτόνομα Συστήματα",
    title: "Assignment 2",
    dueDate: "2026-03-17",
  },
  {
    id: "pattern-recognition-assignment-1",
    course: "Αναγνώριση Προτύπων - Στατιστική Μάθηση",
    title: "k-nn classifier & nearest centroid classifier",
    dueDate: "2026-03-29",
  },
  {
    id: "reinforcement-learning-assignment-1",
    course: "Υπολογιστική Νοημοσύνη – Βαθιά Ενισχυτική Μάθηση",
    title: "Επίλυση προβλήματος βαθιάς ενισχυτικής μάθησης",
    dueDate: "2026-05-23",
  },
   {
    id: "crypto-1",
    course: "Θεμελειώσεις Κρυπτογραφίας",
    title: "Πρώτο πρότζεκτ (2μ), όχι καθορισμένη Ημ.Παρ.",
    dueDate: "2026-03-30",
  },
];

export function getDueAssignments(): Assignment[] {
  return [...assignments].sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
}
