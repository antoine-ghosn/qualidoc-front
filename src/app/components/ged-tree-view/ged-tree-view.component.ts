import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  SimpleChanges,
} from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CommonModule } from '@angular/common';
import { TreeViewService } from '../../utils/services/tree-view.service';
import {
  DocumentColumn,
  DocumentType,
  Document,
} from '../../open-api/generated';

interface DocumentNode {
  category: string;
  name?: string;
  path?: string;
  meta_data?: Array<string>;
  children: Array<DocumentNode>;
  data?: Document;
}

@Component({
  selector: 'app-ged-tree-view',
  imports: [MaterialModule, TablerIconsModule, CommonModule],
  templateUrl: './ged-tree-view.component.html',
  styleUrl: './ged-tree-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GedTreeViewComponent {
  @Input() data: Array<Document> = [];
  @Input() columnName!: string;
  @Input() groupBy!: string;
  @Input() baseType!: DocumentType | undefined;
  @Input() columns: DocumentColumn[] = [];

  dataSource: DocumentNode[] = [];
  treeViewService = inject(TreeViewService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.baseType) {
      this.dataSource = this.treeViewService.buildTreeByHierarchy(
        this.baseType.treeViewHierarchy || [],
        this.data
      ).children;
    }
  }

  getDocumentNameFormat(doc: DocumentNode): string {
    const template = this.baseType?.leafFormat ?? '{name}';
    const metaJoined = Array.isArray(doc.meta_data)
      ? doc.meta_data.filter(Boolean).join(' - ')
      : '';

    const resolvePath = (obj: any, path: string): any =>
      path
        .split('.')
        .reduce(
          (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
          obj
        );

    return template.replace(/{([^}]+)}/g, (_, expr: string) => {
      const key = expr.trim();

      if (doc.data) {
        const resolved = resolvePath(doc.data, key);
        if (resolved !== undefined && resolved !== null) return resolved;
      }

      return `{${key}}`;
    });
  }

  childrenAccessor = (node: DocumentNode) => node.children ?? [];

  hasChild = (_: number, node: DocumentNode) =>
    !!node.children && node.children.length > 0;
}
