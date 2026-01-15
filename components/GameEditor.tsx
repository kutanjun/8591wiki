
import React, { useState, useEffect, useRef } from 'react';
import { GameKB, GameCategory, SectionType, KBItem, CustomSectionType, KBSubItem } from '../types';
import ImageGallery from './ImageGallery';

// 获取所有板块类型（包括自定义的）
const getAllSectionTypes = (): string[] => {
  const defaultTypes = [
    SectionType.MECHANICS,
    SectionType.CONTACT,
    SectionType.TERMINOLOGY,
    SectionType.FAQ,
    SectionType.PRACTICE
  ];
  
  const customTypes = JSON.parse(localStorage.getItem('customSectionTypes') || '[]') as CustomSectionType[];
  const customNames = customTypes.map(t => t.name);
  
  return [...defaultTypes, ...customNames];
};

interface GameEditorProps {
  game: GameKB;
  onSave: (game: GameKB) => void;
  onCancel: () => void;
  onUpdateSection: (gameId: string, sectionType: string, items: KBItem[]) => void;
  customSectionTypes?: CustomSectionType[];
  onAddCustomSectionType?: (name: string) => void;
  onDeleteCustomSectionType?: (id: string) => void;
}

const GameEditor: React.FC<GameEditorProps> = ({ 
  game, 
  onSave, 
  onCancel, 
  onUpdateSection,
  customSectionTypes = [],
  onAddCustomSectionType,
  onDeleteCustomSectionType,
  getAllSectionTypes: getAllSectionTypesProp,
  onAddSectionType: onAddSectionTypeProp,
  onDeleteSectionType: onDeleteSectionTypeProp,
  onRenameSectionType: onRenameSectionTypeProp
}) => {
  const [editedGame, setEditedGame] = useState<GameKB>(game);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<KBItem | null>(null);
  const [editingSubItem, setEditingSubItem] = useState<KBSubItem | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isAddingSubItem, setIsAddingSubItem] = useState(false);
  const [imageGalleryText, setImageGalleryText] = useState<string>('');
  const [subItemImageGalleryText, setSubItemImageGalleryText] = useState<string>('');
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [showSectionTypeManager, setShowSectionTypeManager] = useState(false);
  const [newSectionTypeName, setNewSectionTypeName] = useState('');
  const [editingSectionTypeName, setEditingSectionTypeName] = useState<string | null>(null);
  const [editingSectionTypeNewName, setEditingSectionTypeNewName] = useState<string>('');

  // Table Modal State
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  useEffect(() => {
    setEditedGame(game);
  }, [game]);

  // 获取所有板块类型（优先使用传入的函数，否则使用本地函数）
  const getAllSectionTypesLocal = (): string[] => {
    if (getAllSectionTypesProp) {
      return getAllSectionTypesProp();
    }
    return getAllSectionTypes();
  };

  // 添加板块类型到当前游戏
  const handleAddSectionTypeToGame = (sectionTypeName: string) => {
    const trimmedName = sectionTypeName.trim();
    if (!trimmedName) return;
    
    // 检查是否已存在
    if (editedGame.sections.some(s => s.type === trimmedName)) {
      alert('該板塊類型已存在於此遊戲中！');
      return;
    }
    
    // 如果是全局新增，先调用全局函数
    if (onAddSectionTypeProp) {
      onAddSectionTypeProp(trimmedName);
    } else if (onAddCustomSectionType) {
      onAddCustomSectionType(trimmedName);
    }
    
    // 添加到当前游戏
    handleAddSectionToGame(trimmedName);
    setNewSectionTypeName('');
  };

  // 添加板块到当前游戏
  const handleAddSectionToGame = (sectionType: string) => {
    if (editedGame.sections.some(s => s.type === sectionType)) {
      alert('該板塊類型已存在於此遊戲中！');
      return;
    }
    
    const updatedGame = {
      ...editedGame,
      sections: [...editedGame.sections, { type: sectionType as SectionType, items: [] }]
    };
    setEditedGame(updatedGame);
    alert(`✅ 已將「${sectionType}」添加到此遊戲！`);
  };

  // 从当前游戏移除板块
  const handleRemoveSectionFromGame = (sectionType: string) => {
    if (!confirm(`確定要從此遊戲中移除「${sectionType}」嗎？這將刪除該板塊的所有知識點！`)) {
      return;
    }
    
    const updatedGame = {
      ...editedGame,
      sections: editedGame.sections.filter(s => s.type !== sectionType)
    };
    setEditedGame(updatedGame);
    alert(`✅ 已從此遊戲中移除「${sectionType}」！`);
  };

  // 开始编辑板块类型名称
  const handleStartEditSectionTypeName = (oldName: string) => {
    setEditingSectionTypeName(oldName);
    setEditingSectionTypeNewName(oldName);
  };

  // 保存板块类型名称修改
  const handleSaveSectionTypeName = (oldName: string) => {
    const newName = editingSectionTypeNewName.trim();
    if (!newName) {
      alert('名稱不能為空！');
      return;
    }
    
    if (newName === oldName) {
      setEditingSectionTypeName(null);
      return;
    }

    // 检查新名称是否已存在
    const allTypes = getAllSectionTypesLocal();
    if (allTypes.includes(newName) && newName !== oldName) {
      alert('該板塊類型名稱已存在！');
      return;
    }

    // 如果有全局重命名函数，使用它（会更新所有游戏）
    if (onRenameSectionTypeProp) {
      onRenameSectionTypeProp(oldName, newName);
      // 更新当前游戏中的板块类型名称
      const updatedGame = {
        ...editedGame,
        sections: editedGame.sections.map(section => 
          section.type === oldName 
            ? { ...section, type: newName as SectionType }
            : section
        )
      };
      setEditedGame(updatedGame);
    } else {
      // 如果没有全局重命名函数，只更新当前游戏
      const updatedGame = {
        ...editedGame,
        sections: editedGame.sections.map(section => 
          section.type === oldName 
            ? { ...section, type: newName as SectionType }
            : section
        )
      };
      setEditedGame(updatedGame);
      onSave(updatedGame);
      alert(`✅ 已將「${oldName}」重命名為「${newName}」！\n注意：此更改僅應用於當前遊戲。`);
    }
    
    setEditingSectionTypeName(null);
    setEditingSectionTypeNewName('');
  };

  // 取消编辑
  const handleCancelEditSectionTypeName = () => {
    setEditingSectionTypeName(null);
    setEditingSectionTypeNewName('');
  };

  const handleGameInfoChange = (field: keyof GameKB, value: any) => {
    setEditedGame({ ...editedGame, [field]: value });
  };

  const handleSaveGameInfo = () => {
    onSave(editedGame);
    alert('✅ 遊戲資訊已更新！');
  };

  // 添加大标题知识点
  const handleAddItem = (sectionType: string) => {
    const newItem: KBItem = {
      id: Date.now().toString(),
      title: '',
      author: 'Admin',
      updatedAt: new Date().toISOString().split('T')[0],
      subItems: [],
      textColor: '#FF5722'
    };
    setEditingItem(newItem);
    setImageGalleryText('');
    setIsAddingItem(true);
    setActiveSection(sectionType);
  };

  // 编辑大标题知识点
  const handleEditItem = (item: KBItem, sectionType: string) => {
    setEditingItem({ ...item });
    setImageGalleryText('');
    setIsAddingItem(false);
    setActiveSection(sectionType);
  };

  // 添加子板块
  const handleAddSubItem = (itemId: string) => {
    const newSubItem: KBSubItem = {
      id: Date.now().toString(),
      title: '',
      content: '',
      tags: [],
      textColor: '#FF5722'
    };
    setEditingSubItem(newSubItem);
    setSubItemImageGalleryText('');
    setIsAddingSubItem(true);
    setEditingItem(editingItem ? { ...editingItem } : null);
  };

  // 编辑子板块
  const handleEditSubItem = (subItem: KBSubItem, itemId: string) => {
    try {

      // 找到对应的item
      const section = editedGame.sections.find(s => 
        s.items.some(item => item.id === itemId)
      );
      if (section) {
        const item = section.items.find(item => item.id === itemId);
        if (item) {

          // 确保subItems数组存在
          const itemWithSubItems = {
            ...item,
            subItems: item.subItems || []
          };
          setEditingItem(itemWithSubItems);
          setEditingSubItem({ ...subItem });
          setSubItemImageGalleryText(subItem.imageGallery?.join('\n') || '');
          setIsAddingSubItem(false);
        } else {
          console.error('Item not found:', itemId);
          alert('錯誤：找不到對應的知識點');
        }
      } else {
        console.error('Section not found for itemId:', itemId);
        alert('錯誤：找不到對應的板塊');
      }
    } catch (error) {
      console.error('Error in handleEditSubItem:', error);
      alert('編輯子板塊時出錯：' + String(error));
    }
  };

  // 保存大标题知识点
  const handleSaveItem = () => {
    if (!editingItem || !activeSection) return;
    if (!editingItem.title) {
      alert('請填寫大標題');
      return;
    }

    let section = editedGame.sections.find(s => s.type === activeSection);
    if (!section) {
      section = { type: activeSection as SectionType, items: [] };
      editedGame.sections.push(section);
    }

    let updatedItems: KBItem[];
    if (isAddingItem) {
      updatedItems = [...section.items, editingItem];
    } else {
      updatedItems = section.items.map(item => 
        item.id === editingItem.id ? editingItem : item
      );
    }

    const updatedSections = editedGame.sections.map(s =>
      s.type === activeSection ? { ...s, items: updatedItems } : s
    );
    setEditedGame({ ...editedGame, sections: updatedSections });

    onUpdateSection(editedGame.id, activeSection, updatedItems);
    setEditingItem(null);
    setImageGalleryText('');
    setIsAddingItem(false);
    setActiveSection(null);
    alert('✅ 知識點已保存！');
  };

  // 保存子板块
  const handleSaveSubItem = () => {
    if (!editingSubItem || !editingItem) return;
    if (!editingSubItem.title || !editingSubItem.content) {
      alert('請填寫子板塊標題和內容');
      return;
    }

    const imageGalleryUrls = subItemImageGalleryText
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    const finalSubItem = {
      ...editingSubItem,
      imageGallery: imageGalleryUrls
    };

    // 如果editingItem不存在，尝试从editedGame中查找
    let currentItem = editingItem;
    if (!currentItem && editingSubItem) {
      for (const section of editedGame.sections) {
        const foundItem = section.items.find(item => 
          item.subItems?.some(sub => sub.id === editingSubItem.id)
        );
        if (foundItem) {
          currentItem = foundItem;
          break;
        }
      }
    }

    if (!currentItem) {
      alert('錯誤：找不到對應的大標題知識點，無法保存子板塊');
      return;
    }

    let updatedSubItems: KBSubItem[];
    if (isAddingSubItem) {
      updatedSubItems = [...(currentItem.subItems || []), finalSubItem];
    } else {
      updatedSubItems = (currentItem.subItems || []).map(subItem =>
        subItem.id === finalSubItem.id ? finalSubItem : subItem
      );
    }

    const updatedItem = {
      ...currentItem,
      subItems: updatedSubItems
    };

    setEditingItem(updatedItem);
    setEditingSubItem(null);
    setSubItemImageGalleryText('');
    setIsAddingSubItem(false);
    alert('✅ 子板塊已保存！');
  };

  const handleDeleteItem = (itemId: string, sectionType: string) => {
    if (!confirm('確定要刪除這個知識點嗎？')) return;
    
    const section = editedGame.sections.find(s => s.type === sectionType);
    if (!section) return;

    const updatedItems = section.items.filter(item => item.id !== itemId);
    const updatedSections = editedGame.sections.map(s =>
      s.type === sectionType ? { ...s, items: updatedItems } : s
    );
    setEditedGame({ ...editedGame, sections: updatedSections });

    onUpdateSection(editedGame.id, sectionType, updatedItems);
    alert('✅ 知識點已刪除！');
  };

  const handleDeleteSubItem = (subItemId: string) => {
    if (!editingItem) return;
    if (!confirm('確定要刪除這個子板塊嗎？')) return;

    const updatedSubItems = (editingItem.subItems || []).filter(subItem => subItem.id !== subItemId);
    setEditingItem({ ...editingItem, subItems: updatedSubItems });
    alert('✅ 子板塊已刪除！');
  };

  // 如果正在编辑子板块
  if (editingSubItem) {

    
    // 如果editingItem不存在，尝试从editedGame中查找
    let currentItem = editingItem;
    if (!currentItem && editingSubItem) {

      // 尝试找到包含这个subItem的item
      for (const section of editedGame.sections) {
        const foundItem = section.items.find(item => 
          item.subItems?.some(sub => sub.id === editingSubItem.id)
        );
        if (foundItem) {

          currentItem = foundItem;
          // 确保subItems数组存在
          const itemWithSubItems = {
            ...foundItem,
            subItems: foundItem.subItems || []
          };
          setEditingItem(itemWithSubItems);
          break;
        }
      }
    }

    // 如果还是找不到，显示错误信息
    if (!currentItem) {
      console.error('Cannot find item for subItem:', editingSubItem);
      return (
        <div className="max-w-4xl mx-auto mt-6">
          <div className="glass-card rounded-[4rem] p-12 border-8 border-white shadow-2xl">
            <div className="text-center py-12">
              <p className="text-red-500 text-lg font-bold mb-4">錯誤：找不到對應的大標題知識點</p>
              <p className="text-sm text-slate-500 mb-4">請先編輯大標題知識點，然後再編輯子板塊</p>
              <button
                onClick={() => {
                  setEditingSubItem(null);
                  setSubItemImageGalleryText('');
                  setIsAddingSubItem(false);
                  setEditingItem(null);
                  setActiveSection(null);
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300"
              >
                返回
              </button>
            </div>
          </div>
        </div>
      );
    }

    // 确保editingSubItem存在
    if (!editingSubItem) {
      console.error('editingSubItem is null!');
      return (
        <div className="max-w-4xl mx-auto mt-6">
          <div className="glass-card rounded-[4rem] p-12 border-8 border-white shadow-2xl">
            <div className="text-center py-12">
              <p className="text-red-500 text-lg font-bold mb-4">錯誤：子板塊數據為空</p>
              <button
                onClick={() => {
                  setEditingSubItem(null);
                  setSubItemImageGalleryText('');
                  setIsAddingSubItem(false);
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300"
              >
                返回
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto mt-6">
        {/* Table Generator Modal */}
        {showTableModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-white transform transition-all scale-100">
              <h4 className="text-2xl font-black text-slate-800 mb-6 text-center">插入表格</h4>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">行數 (Rows)</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={tableRows}
                    onChange={(e) => setTableRows(parseInt(e.target.value) || 1)}
                    className="w-full px-6 py-4 bg-slate-100 rounded-2xl border-2 border-transparent outline-none focus:bg-white focus:border-purple-400 mt-2 text-slate-700 font-bold text-center text-xl"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">列數 (Columns)</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={tableCols}
                    onChange={(e) => setTableCols(parseInt(e.target.value) || 1)}
                    className="w-full px-6 py-4 bg-slate-100 rounded-2xl border-2 border-transparent outline-none focus:bg-white focus:border-purple-400 mt-2 text-slate-700 font-bold text-center text-xl"
                  />
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setShowTableModal(false)}
                    className="flex-1 py-3 bg-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-300 transition-all"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => {
                      if (!editingSubItem) return;
                      
                      const numRows = tableRows;
                      const numCols = tableCols;
                      
                      if (numRows <= 0 || numCols <= 0) {
                        alert('請輸入有效的數字！');
                        return;
                      }

                      let tableHtml = '<table style="width: 100%; border-collapse: collapse; margin: 1em 0;">\n';
                      // Header
                      tableHtml += '  <thead>\n    <tr style="background-color: #f8fafc;">\n';
                      for (let j = 0; j < numCols; j++) {
                        tableHtml += `      <th style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; text-align: left;">標題 ${j + 1}</th>\n`;
                      }
                      tableHtml += '    </tr>\n  </thead>\n';
                      // Body
                      tableHtml += '  <tbody>\n';
                      for (let i = 0; i < numRows; i++) {
                        tableHtml += '    <tr>\n';
                        for (let j = 0; j < numCols; j++) {
                          tableHtml += `      <td style="border: 1px solid #cbd5e1; padding: 8px;">內容</td>\n`;
                        }
                        tableHtml += '    </tr>\n';
                      }
                      tableHtml += '  </tbody>\n</table>';

                      const textarea = contentTextareaRef.current;
                      if (textarea) {
                        textarea.focus();
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const currentContent = editingSubItem.content || '';
                        
                        const newContent = 
                          currentContent.substring(0, start) + 
                          tableHtml + 
                          currentContent.substring(end);
                          
                        setEditingSubItem({ ...editingSubItem, content: newContent });
                        
                        setTimeout(() => {
                          const newPos = start + tableHtml.length;
                          textarea.setSelectionRange(newPos, newPos);
                        }, 0);
                      } else {
                        setEditingSubItem({ ...editingSubItem, content: (editingSubItem.content || '') + tableHtml });
                      }
                      setShowTableModal(false);
                    }}
                    className="flex-1 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-all shadow-lg shadow-purple-200"
                  >
                    插入表格
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="glass-card rounded-[4rem] p-12 border-8 border-white shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-black text-slate-800 acg-title">
              {isAddingSubItem ? '新增子板塊' : '編輯子板塊'}
            </h3>
            <button
              onClick={() => {
                setEditingSubItem(null);
                setSubItemImageGalleryText('');
                setIsAddingSubItem(false);
                // 如果editingItem存在，保持在编辑大标题状态
                // 如果不存在，返回主编辑界面
                if (!editingItem) {
                  setEditingItem(null);
                  setActiveSection(null);
                }
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300"
            >
              返回
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">子板塊標題</label>
              <input
                type="text"
                value={editingSubItem?.title || ''}
                onChange={(e) => {
                  if (editingSubItem) {
                    setEditingSubItem({ ...editingSubItem, title: e.target.value });
                  }
                }}
                className="w-full px-6 py-4 bg-white/60 rounded-2xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 mt-2 text-slate-700 font-bold"
                placeholder="例如：註冊與登入流程"
              />
            </div>

            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">內容（支持HTML格式）</label>
              <textarea
                ref={contentTextareaRef}
                value={editingSubItem?.content || ''}
                onChange={(e) => {
                  if (editingSubItem) {
                    setEditingSubItem({ ...editingSubItem, content: e.target.value });
                  }
                }}
                className="w-full px-6 py-4 bg-white/60 rounded-2xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 mt-2 text-slate-700 font-bold min-h-[200px] font-mono text-sm"
                placeholder="輸入內容，可以使用HTML標籤設置顏色&#10;例如：這是<span style='color: red'>紅色文字</span>，這是<span style='color: blue'>藍色文字</span>"
              />
              <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700 font-bold mb-2">💡 顏色設置提示：</p>
                <p className="text-xs text-blue-600 mb-1">
                  使用 <code className="bg-white px-1 rounded">&lt;span style='color: red'&gt;文字&lt;/span&gt;</code> 來設置文字顏色
                </p>
                <p className="text-xs text-blue-600 mb-1">
                  常用顏色：<code className="bg-white px-1 rounded">red</code>, <code className="bg-white px-1 rounded">blue</code>, <code className="bg-white px-1 rounded">green</code>, <code className="bg-white px-1 rounded">orange</code>, <code className="bg-white px-1 rounded">purple</code>
                </p>
                <p className="text-xs text-blue-600">
                  也可以使用十六進制：<code className="bg-white px-1 rounded">#ff0000</code>, <code className="bg-white px-1 rounded">#0066cc</code> 等
                </p>
              </div>
              {/* 快速插入颜色标签按钮 */}
              <div className="mt-3">
                <p className="text-xs text-slate-500 font-bold mb-2">快速插入顏色標籤：</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: '紅色', color: 'red', code: 'red' },
                    { name: '藍色', color: 'blue', code: 'blue' },
                    { name: '綠色', color: 'green', code: 'green' },
                    { name: '橙色', color: 'orange', code: 'orange' },
                    { name: '紫色', color: 'purple', code: 'purple' }
                  ].map((colorOption) => (
                    <button
                      key={colorOption.name}
                      type="button"
                    onClick={() => {
                      const textarea = contentTextareaRef.current;
                      if (textarea) {
                        textarea.focus();
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const selectedText = editingSubItem.content.substring(start, end);
                        const colorTag = selectedText 
                          ? `<span style="color: ${colorOption.code}">${selectedText}</span>`
                          : `<span style="color: ${colorOption.code}">文字</span>`;
                        const newContent = 
                          editingSubItem.content.substring(0, start) + 
                          colorTag + 
                          editingSubItem.content.substring(end);
                        setEditingSubItem({ ...editingSubItem, content: newContent });
                        // 设置光标位置
                        setTimeout(() => {
                          const newPos = start + colorTag.length;
                          textarea.setSelectionRange(newPos, newPos);
                        }, 0);
                      } else {
                        // 如果没有textarea引用，直接在末尾插入
                        const colorTag = `<span style="color: ${colorOption.code}">文字</span>`;
                        setEditingSubItem({ ...editingSubItem, content: editingSubItem.content + colorTag });
                      }
                    }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-white hover:scale-105 transition-all text-white"
                      style={{ backgroundColor: colorOption.color }}
                    >
                      {colorOption.name}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      if (!editingSubItem) return;
                      const colorCode = prompt('請輸入顏色代碼（如：#ff0000 或 red）', '#ff0000');
                      if (colorCode) {
                        const textarea = contentTextareaRef.current;
                        if (textarea) {
                          textarea.focus();
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const currentContent = editingSubItem.content || '';
                          const selectedText = currentContent.substring(start, end);
                          const colorTag = selectedText 
                            ? `<span style="color: ${colorCode}">${selectedText}</span>`
                            : `<span style="color: ${colorCode}">文字</span>`;
                          const newContent = 
                            currentContent.substring(0, start) + 
                            colorTag + 
                            currentContent.substring(end);
                          setEditingSubItem({ ...editingSubItem, content: newContent });
                          setTimeout(() => {
                            const newPos = start + colorTag.length;
                            textarea.setSelectionRange(newPos, newPos);
                          }, 0);
                        } else {
                          const colorTag = `<span style="color: ${colorCode}">文字</span>`;
                          setEditingSubItem({ ...editingSubItem, content: (editingSubItem.content || '') + colorTag });
                        }
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-white hover:scale-105 transition-all bg-gray-200 text-gray-700"
                  >
                    自定義顏色
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTableRows(3);
                      setTableCols(3);
                      setShowTableModal(true);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-white hover:scale-105 transition-all bg-indigo-200 text-indigo-700"
                  >
                    插入表格
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  💡 提示：在內容中選中文字後點擊顏色按鈕，會將選中的文字設置為該顏色
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">標籤（用逗號分隔）</label>
              <input
                type="text"
                value={editingSubItem.tags?.join(', ') || ''}
                onChange={(e) => {
                  const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                  setEditingSubItem({ ...editingSubItem, tags });
                }}
                className="w-full px-6 py-4 bg-white/60 rounded-2xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 mt-2 text-slate-700 font-bold"
                placeholder="例如：註冊, 登入"
              />
            </div>

            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">圖片 URL（單張）</label>
              <input
                type="text"
                value={editingSubItem?.image || ''}
                onChange={(e) => {
                  if (editingSubItem) {
                    setEditingSubItem({ ...editingSubItem, image: e.target.value });
                  }
                }}
                className="w-full px-6 py-4 bg-white/60 rounded-2xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 mt-2 text-slate-500 text-sm font-bold"
                placeholder="輸入圖片URL"
              />
            </div>

            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">圖冊（多張圖片，每行一個URL）</label>
              <textarea
                value={subItemImageGalleryText}
                onChange={(e) => setSubItemImageGalleryText(e.target.value)}
                className="w-full px-6 py-4 bg-white/60 rounded-2xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 mt-2 text-slate-500 text-sm font-bold min-h-[150px] resize-y"
                placeholder="每行輸入一個圖片URL，按Enter換行"
                style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
              />
            </div>

            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">視頻 URL</label>
              <input
                type="text"
                value={editingSubItem?.video || ''}
                onChange={(e) => {
                  if (editingSubItem) {
                    setEditingSubItem({ ...editingSubItem, video: e.target.value });
                  }
                }}
                className="w-full px-6 py-4 bg-white/60 rounded-2xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 mt-2 text-slate-500 text-sm font-bold"
                placeholder="輸入視頻嵌入URL"
              />
            </div>

            {/* 颜色选择 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">文字顏色</label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="color"
                    value={editingSubItem?.textColor || '#FF5722'}
                    onChange={(e) => {
                      if (editingSubItem) {
                        setEditingSubItem({ ...editingSubItem, textColor: e.target.value });
                      }
                    }}
                    className="w-16 h-12 rounded-xl border-2 border-white cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editingSubItem?.textColor || ''}
                    onChange={(e) => {
                      if (editingSubItem) {
                        setEditingSubItem({ ...editingSubItem, textColor: e.target.value });
                      }
                    }}
                    className="flex-1 px-4 py-3 bg-white/60 rounded-xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 text-slate-700 font-bold"
                    placeholder="#FF5722"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">背景顏色</label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="color"
                    value={editingSubItem?.backgroundColor || '#ffffff'}
                    onChange={(e) => {
                      if (editingSubItem) {
                        setEditingSubItem({ ...editingSubItem, backgroundColor: e.target.value });
                      }
                    }}
                    className="w-16 h-12 rounded-xl border-2 border-white cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editingSubItem?.backgroundColor || ''}
                    onChange={(e) => {
                      if (editingSubItem) {
                        setEditingSubItem({ ...editingSubItem, backgroundColor: e.target.value });
                      }
                    }}
                    className="flex-1 px-4 py-3 bg-white/60 rounded-xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 text-slate-700 font-bold"
                    placeholder="#ffffff"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveSubItem}
              className="w-full py-4 btn-orange text-white rounded-2xl font-black text-lg hover:scale-[1.02] transition-all"
            >
              💾 保存子板塊
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 如果正在编辑大标题知识点
  if (editingItem && activeSection) {
    return (
      <div className="max-w-4xl mx-auto mt-6">
        <div className="glass-card rounded-[4rem] p-12 border-8 border-white shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-black text-slate-800 acg-title">
              {isAddingItem ? '新增大標題知識點' : '編輯大標題知識點'}
            </h3>
            <button
              onClick={() => {
                setEditingItem(null);
                setImageGalleryText('');
                setIsAddingItem(false);
                setActiveSection(null);
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300"
            >
              取消
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">大標題</label>
              <input
                type="text"
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                className="w-full px-6 py-4 bg-white/60 rounded-2xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 mt-2 text-slate-700 font-bold"
                placeholder="例如：一、如何註冊與登入"
              />
            </div>

            {/* 颜色选择 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">文字顏色</label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="color"
                    value={editingItem.textColor || '#FF5722'}
                    onChange={(e) => setEditingItem({ ...editingItem, textColor: e.target.value })}
                    className="w-16 h-12 rounded-xl border-2 border-white cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editingItem.textColor || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, textColor: e.target.value })}
                    className="flex-1 px-4 py-3 bg-white/60 rounded-xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 text-slate-700 font-bold"
                    placeholder="#FF5722"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">背景顏色</label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="color"
                    value={editingItem.backgroundColor || '#ffffff'}
                    onChange={(e) => setEditingItem({ ...editingItem, backgroundColor: e.target.value })}
                    className="w-16 h-12 rounded-xl border-2 border-white cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editingItem.backgroundColor || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, backgroundColor: e.target.value })}
                    className="flex-1 px-4 py-3 bg-white/60 rounded-xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 text-slate-700 font-bold"
                    placeholder="#ffffff"
                  />
                </div>
              </div>
            </div>

            {/* 子板块列表 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">子板塊</label>
                <button
                  type="button"
                  onClick={() => handleAddSubItem(editingItem.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 text-sm"
                >
                  ➕ 新增子板塊
                </button>
              </div>
              <div className="space-y-3">
                {(editingItem.subItems || []).map((subItem) => (
                  <div key={subItem.id} className="p-4 bg-white/60 rounded-xl border-2 border-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-slate-800">{subItem.title || '未命名子板塊'}</h5>
                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{subItem.content}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditSubItem(subItem, editingItem.id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 text-xs"
                        >
                          編輯
                        </button>
                        <button
                          onClick={() => handleDeleteSubItem(subItem.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 text-xs"
                        >
                          刪除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {(!editingItem.subItems || editingItem.subItems.length === 0) && (
                  <p className="text-center text-slate-400 py-4">暫無子板塊，點擊「新增子板塊」添加</p>
                )}
              </div>
            </div>

            <button
              onClick={handleSaveItem}
              className="w-full py-4 btn-orange text-white rounded-2xl font-black text-lg hover:scale-[1.02] transition-all"
            >
              💾 保存大標題知識點
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-6 space-y-6">
      {/* 遊戲基本信息編輯 */}
      <div className="glass-card rounded-[4rem] p-12 border-8 border-white shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-black text-slate-800 acg-title">編輯遊戲資訊</h3>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300"
          >
            返回列表
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">遊戲名稱</label>
              <input
                type="text"
                value={editedGame.name}
                onChange={(e) => handleGameInfoChange('name', e.target.value)}
                className="w-full px-6 py-4 bg-white/60 rounded-2xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 mt-2 text-slate-700 font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">分類</label>
              <div className="flex gap-4 bg-white/60 p-2 rounded-2xl border-2 border-white mt-2">
                <button
                  type="button"
                  onClick={() => handleGameInfoChange('category', GameCategory.ONLINE)}
                  className={`flex-1 py-3 rounded-xl font-black transition-all ${
                    editedGame.category === GameCategory.ONLINE 
                      ? 'bg-slate-800 text-white shadow-xl' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  💻 線上
                </button>
                <button
                  type="button"
                  onClick={() => handleGameInfoChange('category', GameCategory.MOBILE)}
                  className={`flex-1 py-3 rounded-xl font-black transition-all ${
                    editedGame.category === GameCategory.MOBILE 
                      ? 'bg-orange-500 text-white shadow-xl' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  📱 手遊
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">封面圖片 URL</label>
            <input
              type="text"
              value={editedGame.coverImage}
              onChange={(e) => handleGameInfoChange('coverImage', e.target.value)}
              className="w-full px-6 py-4 bg-white/60 rounded-2xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 mt-2 text-slate-500 text-sm font-bold"
            />
            <p className="mt-2 text-xs text-slate-400">
              建議使用 800×400 尺寸（2:1 橫圖），可在列表卡片中完整展示
            </p>
            {editedGame.coverImage && (
              <div className="mt-4">
                <img 
                  src={editedGame.coverImage} 
                  alt="預覽" 
                  className="w-full h-48 object-cover rounded-2xl border-2 border-white"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Banner 圖片 URL（選填，獨立於封面圖）</label>
            <input
              type="text"
              value={editedGame.bannerImage || ''}
              onChange={(e) => handleGameInfoChange('bannerImage', e.target.value)}
              className="w-full px-6 py-4 bg-white/60 rounded-2xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 mt-2 text-slate-500 text-sm font-bold"
              placeholder="留空則使用封面圖作為 Banner"
            />
            <p className="mt-2 text-xs text-slate-400">
              建議使用 1600×800（2:1）圖片；Banner 圖片用於遊戲板塊頂部的橫幅展示，與封面圖分開管理
            </p>
            {editedGame.bannerImage && (
              <div className="mt-4">
                <img 
                  src={editedGame.bannerImage} 
                  alt="Banner 預覽" 
                  className="w-full h-48 object-cover rounded-2xl border-2 border-white"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <button
                  onClick={() => handleGameInfoChange('bannerImage', '')}
                  className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-bold transition-all"
                >
                  清除 Banner 圖片
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Banner 標題（選填，顯示版本信息）</label>
            <input
              type="text"
              value={editedGame.bannerTitle || ''}
              onChange={(e) => handleGameInfoChange('bannerTitle', e.target.value)}
              className="w-full px-6 py-4 bg-white/60 rounded-2xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 mt-2 text-slate-500 text-sm font-bold"
              placeholder="例如：傳說對決 v1.0.0"
            />
            <p className="mt-2 text-xs text-slate-400">
              Banner 標題將顯示在 Banner 底部，讓客服直觀了解當前遊戲版本
            </p>
          </div>

          <div>
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Banner 跳轉鏈接（選填）</label>
            <input
              type="url"
              value={editedGame.bannerLink || ''}
              onChange={(e) => handleGameInfoChange('bannerLink', e.target.value)}
              className="w-full px-6 py-4 bg-white/60 rounded-2xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 mt-2 text-slate-500 text-sm font-bold"
              placeholder="https://example.com"
            />
            <p className="mt-2 text-xs text-slate-400">
              設置後，點擊 Banner 或標題將跳轉到該鏈接
            </p>
          </div>

          <div>
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">遊戲官網 URL（選填）</label>
            <input
              type="text"
              value={editedGame.officialWebsite || ''}
              onChange={(e) => handleGameInfoChange('officialWebsite', e.target.value)}
              className="w-full px-6 py-4 bg-white/60 rounded-2xl border-2 border-white outline-none focus:bg-white focus:border-orange-400 mt-2 text-slate-500 text-sm font-bold"
              placeholder="例如：https://example.com"
            />
            <p className="mt-2 text-xs text-slate-400">
              設置後，點擊遊戲圖片或標題將跳轉到官網，而不是進入遊戲板塊
            </p>
          </div>

          <button
            onClick={handleSaveGameInfo}
            className="w-full py-4 btn-orange text-white rounded-2xl font-black text-lg hover:scale-[1.02] transition-all"
          >
            💾 保存遊戲資訊
          </button>
        </div>
      </div>

      {/* 知識點編輯 */}
      <div className="glass-card rounded-[4rem] p-12 border-8 border-white shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-black text-slate-800 acg-title">知識點管理</h3>
          <button
            onClick={() => setShowSectionTypeManager(!showSectionTypeManager)}
            className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-all"
          >
            {showSectionTypeManager ? '📋 隱藏板塊管理' : '⚙️ 管理板塊類型'}
          </button>
        </div>

        {/* 板块类型管理 */}
        {showSectionTypeManager && (
          <div className="mb-8 p-6 bg-white/80 rounded-[2rem] border-4 border-purple-200 shadow-xl">
            <h4 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-3">
              <span className="text-2xl">📋</span>
              板塊類型管理
            </h4>
            
            {/* 新增板块类型 */}
            <div className="mb-4 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
              <label className="text-sm font-black text-purple-700 uppercase tracking-widest mb-2 block">
                新增板塊類型
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newSectionTypeName}
                  onChange={(e) => setNewSectionTypeName(e.target.value)}
                  placeholder="例如：遊戲版本、更新公告等"
                  className="flex-1 px-4 py-3 bg-white rounded-xl border-2 border-purple-200 outline-none focus:border-purple-400 text-slate-700 font-bold"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newSectionTypeName.trim()) {
                      handleAddSectionTypeToGame(newSectionTypeName);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (newSectionTypeName.trim()) {
                      handleAddSectionTypeToGame(newSectionTypeName);
                    }
                  }}
                  className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-all"
                >
                  ➕ 新增
                </button>
              </div>
            </div>

            {/* 板块类型列表 */}
            <div className="space-y-2">
              <h5 className="text-lg font-black text-slate-700 mb-2">現有板塊類型：</h5>
              {getAllSectionTypesLocal().length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {getAllSectionTypesLocal().map((sectionType) => {
                    const hasSection = editedGame.sections.some(s => s.type === sectionType);
                    const isEditing = editingSectionTypeName === sectionType;
                    
                    return (
                      <div
                        key={sectionType}
                        className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                          hasSection 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        {isEditing ? (
                          <div className="flex-1 flex items-center gap-2">
                            <input
                              type="text"
                              value={editingSectionTypeNewName}
                              onChange={(e) => setEditingSectionTypeNewName(e.target.value)}
                              className="flex-1 px-3 py-1.5 bg-white rounded-lg border-2 border-purple-300 outline-none focus:border-purple-500 text-slate-700 font-bold text-sm"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleSaveSectionTypeName(sectionType);
                                } else if (e.key === 'Escape') {
                                  handleCancelEditSectionTypeName();
                                }
                              }}
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveSectionTypeName(sectionType)}
                              className="px-3 py-1.5 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-all text-xs"
                            >
                              ✓
                            </button>
                            <button
                              onClick={handleCancelEditSectionTypeName}
                              className="px-3 py-1.5 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600 transition-all text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="font-bold text-slate-700 flex-1">{sectionType}</span>
                            <div className="flex gap-2">
                              {hasSection && (
                                <>
                                  <button
                                    onClick={() => handleStartEditSectionTypeName(sectionType)}
                                    className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition-all text-xs"
                                    title="編輯名稱"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    onClick={() => handleRemoveSectionFromGame(sectionType)}
                                    className="px-3 py-1.5 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-all text-xs"
                                  >
                                    從此遊戲移除
                                  </button>
                                </>
                              )}
                              {!hasSection && (
                                <button
                                  onClick={() => handleAddSectionToGame(sectionType)}
                                  className="px-3 py-1.5 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-all text-xs"
                                >
                                  添加到此遊戲
                                </button>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-slate-400 text-center py-4">暫無板塊類型</p>
              )}
            </div>
          </div>
        )}
        
        <div className="space-y-8">
          {editedGame.sections.map((section) => {
            const sectionType = section.type;
            const items = section.items || [];

            return (
              <div key={sectionType} className="border-2 border-white rounded-2xl p-6 bg-white/40">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-2xl font-black text-slate-800">{sectionType}</h4>
                  <button
                    onClick={() => handleAddItem(sectionType)}
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl font-bold hover:scale-105 transition-all text-sm"
                  >
                    ➕ 新增大標題知識點
                  </button>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="p-6 bg-white/60 rounded-2xl border-2 border-white">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h5 className="text-lg font-black text-slate-800 mb-2">{item.title}</h5>
                          {item.subItems && item.subItems.length > 0 && (
                            <div className="mt-3 space-y-2">
                              <p className="text-sm text-slate-500 mb-2">
                                包含 {item.subItems.length} 個子板塊：
                              </p>
                              {item.subItems.map((subItem) => (
                                <div key={subItem.id} className="p-3 bg-white/80 rounded-lg border border-gray-200">
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <h6 className="font-bold text-slate-700 text-sm">{subItem.title || '未命名子板塊'}</h6>
                                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{subItem.content}</p>
                                    </div>
                                    <button
                                      onClick={() => {
                                        // 先设置editingItem，然后设置editingSubItem
                                        setEditingItem({ ...item });
                                        setActiveSection(sectionType);
                                        handleEditSubItem(subItem, item.id);
                                      }}
                                      className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 text-xs"
                                    >
                                      編輯
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditItem(item, sectionType)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 text-sm"
                          >
                            編輯
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id, sectionType)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 text-sm"
                          >
                            刪除
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <p>暫無知識點，點擊「新增大標題知識點」添加</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameEditor;
