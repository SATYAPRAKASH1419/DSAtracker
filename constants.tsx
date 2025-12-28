
import { MasteryLevel, Chapter } from './types';

export const MASTERY_COLORS = {
  [MasteryLevel.NOT_STARTED]: 'bg-slate-100 text-slate-500 border-slate-200',
  [MasteryLevel.NEEDS_PRACTICE]: 'bg-rose-50 text-rose-600 border-rose-200',
  [MasteryLevel.PRACTICING]: 'bg-amber-50 text-amber-600 border-amber-200',
  [MasteryLevel.MASTERED]: 'bg-emerald-50 text-emerald-600 border-emerald-200',
};

export const INITIAL_DSA_DATA: Chapter[] = [
  {
    id: 'ch1',
    title: 'Arrays & Hashing',
    subTopics: [
      { id: 'st1-1', name: 'Static vs Dynamic Arrays', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st1-2', name: 'Hash Table Implementation (Collisions)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st1-3', name: 'Prefix Sums & Suffix Sums', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st1-4', name: 'Frequency Counting (Hash Maps)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st1-5', name: 'Hash Sets for Unique Elements', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st1-6', name: 'Amortized Time Complexity', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch2',
    title: 'Two Pointers',
    subTopics: [
      { id: 'st2-1', name: 'Converging Pointers (Left/Right)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st2-2', name: 'Fast & Slow Pointers (Tortoise/Hare)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st2-3', name: 'Difference Array Technique', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st2-4', name: 'In-place Array Modification', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch3',
    title: 'Sliding Window',
    subTopics: [
      { id: 'st3-1', name: 'Fixed Size Window Pattern', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st3-2', name: 'Variable Size Window (Expansion/Shrinking)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st3-3', name: 'Window with Auxiliary Structures (Map/Set)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st3-4', name: 'Optimization with Sliding Window', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch4',
    title: 'Stack',
    subTopics: [
      { id: 'st4-1', name: 'Last-In First-Out (LIFO) Principles', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st4-2', name: 'Monotonic Stack (Next Greater Element)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st4-3', name: 'Expression Parsing (RPN, Parentheses)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st4-4', name: 'Call Stack Simulation with Arrays', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch5',
    title: 'Binary Search',
    subTopics: [
      { id: 'st5-1', name: 'Standard Search on Sorted Arrays', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st5-2', name: 'Binary Search on Answer (Optimization Range)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st5-3', name: 'Search in Rotated/Modified Spaces', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st5-4', name: 'Matrix Search (2D Binary Search)', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch6',
    title: 'Linked List',
    subTopics: [
      { id: 'st6-1', name: 'Singly vs Doubly vs Circular Lists', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st6-2', name: 'In-place Pointer Reversal', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st6-3', name: 'Sentinel/Dummy Node Pattern', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st6-4', name: 'Floyd\'s Cycle Detection Algorithm', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st6-5', name: 'Merging & Splitting Lists', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch7',
    title: 'Trees',
    subTopics: [
      { id: 'st7-1', name: 'Binary Search Tree (BST) Properties', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st7-2', name: 'Recursive DFS (Pre/In/Post Order)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st7-3', name: 'Iterative Traversal using Stacks', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st7-4', name: 'BFS (Level Order Traversal)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st7-5', name: 'Tree Balancing Concepts (AVL/Red-Black)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st7-6', name: 'LCA (Lowest Common Ancestor)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st7-7', name: 'Tree Serialization & Deserialization', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch8',
    title: 'Tries (Prefix Trees)',
    subTopics: [
      { id: 'st8-1', name: 'Trie Node Structure & Insertion', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st8-2', name: 'Prefix Matching & Search', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st8-3', name: 'Autocomplete Systems Logic', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch9',
    title: 'Heaps / Priority Queue',
    subTopics: [
      { id: 'st9-1', name: 'Binary Heap Implementation (Array based)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st9-2', name: 'Heapify, Push, and Pop (Log N)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st9-3', name: 'Two Heaps Pattern (Running Median)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st9-4', name: 'Top-K Elements Pattern', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch10',
    title: 'Backtracking',
    subTopics: [
      { id: 'st10-1', name: 'State Space Tree Exploration', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st10-2', name: 'Permutations vs Combinations', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st10-3', name: 'Decision Trees & Pruning', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st10-4', name: 'Subsets & Power Sets', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch11',
    title: 'Graphs',
    subTopics: [
      { id: 'st11-1', name: 'Adjacency List vs Adjacency Matrix', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st11-2', name: 'DFS & BFS on Graphs', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st11-3', name: 'Cycle Detection (Directed vs Undirected)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st11-4', name: 'Topological Sort (Kahn\'s & DFS)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st11-5', name: 'Connected Components / Flood Fill', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st11-6', name: 'Bipartite Graph Verification', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch12',
    title: 'Advanced Graphs',
    subTopics: [
      { id: 'st12-1', name: 'Union-Find (Disjoint Set Union - DSU)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st12-2', name: 'Path Compression & Union by Rank', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st12-3', name: 'Dijkstra\'s Shortest Path Algorithm', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st12-4', name: 'Prim\'s / Kruskal\'s (Minimum Spanning Tree)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st12-5', name: 'Bellman-Ford & Negative Cycles', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch13',
    title: 'Dynamic Programming (1D)',
    subTopics: [
      { id: 'st13-1', name: 'Memoization (Top-down) vs Tabulation (Bottom-up)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st13-2', name: 'State Definition & Transition Equations', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st13-3', name: 'Knapsack 0/1 Pattern', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st13-4', name: 'Fibonacci-style State Space', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st13-5', name: 'DP Space Optimization Techniques', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch14',
    title: 'Dynamic Programming (2D)',
    subTopics: [
      { id: 'st14-1', name: 'Grid-based DP Paths', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st14-2', name: 'Longest Common Subsequence (LCS)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st14-3', name: 'Edit Distance / String Alignment', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st14-4', name: 'Interval DP Pattern', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st14-5', name: 'Bitmask DP (State Compression)', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch15',
    title: 'Greedy',
    subTopics: [
      { id: 'st15-1', name: 'Local vs Global Optimum', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st15-2', name: 'Greedy Choice Property', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st15-3', name: 'Sorting + Greedy Strategy', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st15-4', name: 'Huffman Coding Concepts', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch16',
    title: 'Intervals',
    subTopics: [
      { id: 'st16-1', name: 'Merging Overlapping Intervals', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st16-2', name: 'Interval Scheduling (Earliest Deadline)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st16-3', name: 'Line Sweep Algorithms', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st16-4', name: 'Meeting Room Allocation Patterns', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch17',
    title: 'Math & Geometry',
    subTopics: [
      { id: 'st17-1', name: 'Sieve of Eratosthenes (Primes)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st17-2', name: 'Greatest Common Divisor (Euclidean Alg)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st17-3', name: 'Modular Arithmetic & Exponentiation', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st17-4', name: 'Coordinate Geometry (Slopes, Distances)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st17-5', name: 'Matrix Rotation Patterns', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  },
  {
    id: 'ch18',
    title: 'Bit Manipulation',
    subTopics: [
      { id: 'st18-1', name: 'AND, OR, XOR, NOT, Shift Ops', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st18-2', name: 'Bitmasking for Subset Representation', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st18-3', name: 'Counting Set Bits (Brian Kernighan)', mastery: MasteryLevel.NOT_STARTED, notes: '' },
      { id: 'st18-4', name: 'Twos Complement & Signedness', mastery: MasteryLevel.NOT_STARTED, notes: '' }
    ]
  }
];
