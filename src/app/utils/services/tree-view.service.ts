import { Injectable } from '@angular/core';
import { DocumentNode } from '../../models/DocumentNode';
import { Document } from '../../open-api/generated';

@Injectable({ providedIn: 'root' })
export class TreeViewService {
  buildTreeByHierarchy(
    hierarchy: string[],
    documents: Document[]
  ): DocumentNode {
    if (!Array.isArray(hierarchy)) {
      throw new Error('treeViewHierarchy must be an array of strings');
    }

    const buildNode = (
      docs: Document[],
      levels: string[],
      collectedMeta: string[] = []
    ): DocumentNode[] => {
      if (levels.length === 0) {
        // Leaf level
        return docs.map((doc) => {
          let displayName = doc['filename'];
          let meta = [...collectedMeta];

          if (hierarchy.length > 0) {
            const lastField = hierarchy[hierarchy.length - 1];
            const evaluated = this.evaluateExpression(doc, lastField);
            if (evaluated) {
              displayName = evaluated;
              meta.push(evaluated);
            }
          }

          return {
            category: 'Document',
            name: displayName,
            path: doc['path'],
            meta_data: meta,
            children: [],
            data: doc,
          };
        });
      }

      const currentField = levels[0];
      const grouped = new Map<string, Document[]>();

      for (const doc of docs) {
        let rawValue: any;

        if (currentField === 'category') {
          rawValue = doc['category']?.name ?? 'VRAC';
        } else {
          rawValue = this.evaluateExpression(doc, currentField);
        }

        const key =
          typeof rawValue === 'object'
            ? JSON.stringify(rawValue)
            : rawValue ?? 'VRAC';

        if (!grouped.has(key)) {
          grouped.set(key, []);
        }
        grouped.get(key)!.push(doc);
      }

      return Array.from(grouped.entries()).map(([key, groupDocs]) => ({
        category: key,
        name: key,
        path: '',
        meta_data: [...collectedMeta, key],
        children: buildNode(groupDocs, levels.slice(1), [...collectedMeta, key]),
      }));
    };

    return {
      category: 'ROOT',
      name: 'Documents',
      path: '',
      meta_data: [],
      children: buildNode(documents, hierarchy),
    };
  }

  /**
   * Evaluate an expression which can be a nested path or a composite with "+"
   */
  private evaluateExpression(doc: any, expr: string): string {
    if (!expr) return '';

    // Handle composite expressions like "immobilier.lot.numero + immobilier.lot.porte"
    if (expr.includes('+')) {
      return expr
        .split('+')
        .map((part) => part.trim())
        .map((path) => this.resolvePath(doc, path))
        .filter((v) => v !== undefined && v !== null)
        .join(' ');
    }

    return this.resolvePath(doc, expr);
  }

  /**
   * Resolve nested paths like "immobilier.lot.numero" safely
   */
  private resolvePath(obj: any, path: string): any {
    return path
      .split('.')
      .reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
        obj
      );
  }
}
