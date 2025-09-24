import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentCard = ({ document, onDownload, onView }) => {
  const getFileIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return 'FileText';
      case 'doc': case'docx':
        return 'FileText';
      case 'xls': case'xlsx':
        return 'FileSpreadsheet';
      case 'ppt': case'pptx':
        return 'Presentation';
      case 'zip': case'rar':
        return 'Archive';
      case 'jpg': case'jpeg': case'png': case'gif':
        return 'Image';
      default:
        return 'File';
    }
  };

  const getFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'contract':
        return 'text-primary bg-primary/10';
      case 'report':
        return 'text-success bg-success/10';
      case 'invoice':
        return 'text-warning bg-warning/10';
      case 'proposal':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted/50';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
            <Icon 
              name={getFileIcon(document?.type)} 
              size={24} 
              className="text-muted-foreground"
            />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-base font-semibold text-foreground truncate pr-2">
              {document?.name}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getCategoryColor(document?.category)}`}>
              {document?.category}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {document?.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-muted-foreground">Size</p>
              <p className="font-medium text-foreground">{getFileSize(document?.size)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Modified</p>
              <p className="font-medium text-foreground">{document?.modifiedDate}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="User" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {document?.uploadedBy}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Download" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {document?.downloadCount} downloads
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onView(document)}
              iconName="Eye"
              iconPosition="left"
            >
              Preview
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => onDownload(document)}
              iconName="Download"
              iconPosition="left"
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;