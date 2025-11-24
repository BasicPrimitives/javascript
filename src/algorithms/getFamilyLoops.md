# Minimum Feedback Arc Set Algorithm (getFamilyLoops)

This algorithm finds a **minimum set of edges to remove from a directed graph** to make it acyclic. It is based on iterative loop-breaking combined with a max-flow / min-cut optimization.

---

## How it works

1. **Identify cycles in the graph**  
   - Remove nodes with no parents (topological sorting).  
   - Remove nodes with no children (reversed topological sorting).  
   - Remaining nodes are only those participating in cycles.

2. **Break cycles iteratively**  
   - Pick a node in the remaining “temp family.”  
   - Remove all its parent edges and store them in a `loops` collection.  
   - Repeat cleaning until no nodes remain.

3. **Construct a clean copy of the family without loops**  
   - Remove edges that were broken during the iterative loop-breaking.

4. **Model broken loops in a flow network**  
   - Add two super-nodes (`from` and `to`).  
   - Connect parent nodes of broken edges to `from` and child nodes to `to`.  
   - Each edge keeps track of its original source/target for recovery.

5. **Compute maximum flow in the network**  
   - Each unit of flow corresponds to a “cycle that must be broken.”  
   - If total flow < number of initially broken loops, some edges are redundant.

6. **Determine minimum cut**  
   - Perform DFS from `from` node in the residual graph.  
   - Identify edges crossing from reachable to unreachable nodes.  
   - Recover original edges from the family structure.  
   - Replace initial loops collection with this optimized set.

7. **Return the final set of edges**  
   - The result is a **minimum set of `Edge(from, to)` objects** that remove all cycles from the graph.  
   - It does **not find all possible minimal sets**, but the returned set is guaranteed to be minimal.

---