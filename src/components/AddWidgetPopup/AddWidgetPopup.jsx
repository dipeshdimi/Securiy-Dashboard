import { useState } from 'react';
import PropTypes from 'prop-types';
import './AddWidgetPopup.css';

function AddWidgetPopup({ currentCategory, onAddWidget, onClose }) {
  const [widgetName, setWidgetName] = useState('');
  const [pairs, setPairs] = useState([{ label: '', data: '' }]);
  const [imageFile, setImageFile] = useState(null);
  const [textContent, setTextContent] = useState('');
  const [activeTab, setActiveTab] = useState(currentCategory);
  const [categories] = useState([
    { id: 1, name: 'CSPM' },
    { id: 2, name: 'CWPP' },
    { id: 3, name: 'Image' }
  ]);

  const handleAdd = () => {
    if (activeTab === 2) {
      if (widgetName && imageFile && textContent) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onAddWidget(activeTab, {
            name: widgetName,
            imageUrl: reader.result,
            textContent
          });
          onClose();
        };
        reader.readAsDataURL(imageFile);
      } else {
        alert('Please ensure all fields are filled out.');
      }
    } else {
      const validPairs = pairs.filter(pair => pair.label.trim() && !isNaN(parseFloat(pair.data.trim())));
      const labelsArray = validPairs.map(pair => pair.label.trim());
      const dataArray = validPairs.map(pair => parseFloat(pair.data.trim()));

      if (widgetName && labelsArray.length > 0 && dataArray.length > 0 && labelsArray.length === dataArray.length) {
        onAddWidget(activeTab, {
          name: widgetName,
          labels: labelsArray,
          chartData: dataArray,
          chartType: 'Donut Chart',
        });
        onClose();
      } else {
        alert('Please ensure all fields are filled out correctly.');
      }
    }
  };

  const handlePairChange = (index, field, value) => {
    const newPairs = [...pairs];
    newPairs[index][field] = value;
    setPairs(newPairs);
  };

  const addPairField = () => {
    setPairs([...pairs, { label: '', data: '' }]);
  };

  const removePairField = (index) => {
    if (pairs.length > 1) {
      setPairs(pairs.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Add Widget</h2>
        <div className='personalize-widget'>
          <p className='instruction'>Personalize your dashboard by adding the following widget:</p>
          <div className="tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`tab-button ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Widget Name"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            className='widget-name'
            required
          />

          {activeTab === 2 ? (
            <div className="form-section">
              <h3>Upload Image and Enter Text</h3>
              <div className="input-group">
                <label className="file-upload-button">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="file-upload-input"
                  />
                  <span className="plus-symbol">+</span>
                </label>
                <input
                  type='text'
                  placeholder="Enter Text Content"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  className="text-content-input"
                  required
                />
              </div>
            </div>
          ) : (
            <div className="form-section">
              <h3>Label and Data Pairs</h3>
              {pairs.map((pair, index) => (
                <div key={index} className="input-group">
                  <input
                    type="text"
                    placeholder={`Label ${index + 1}`}
                    value={pair.label}
                    onChange={(e) => handlePairChange(index, 'label', e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    placeholder={`Data ${index + 1}`}
                    value={pair.data}
                    onChange={(e) => handlePairChange(index, 'data', e.target.value)}
                    required
                  />
                  <button type="button" onClick={() => removePairField(index)} className="remove-button">×</button>
                </div>
              ))}
              <button type="button" onClick={addPairField} className="add-button">+ Add Pair</button>
            </div>
          )}

          <div className="popup-actions">
            <button onClick={onClose} className="cancel-button">Cancel</button>
            <button onClick={handleAdd} className="confirm-button">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
}

AddWidgetPopup.propTypes = {
  currentCategory: PropTypes.number.isRequired,
  onAddWidget: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddWidgetPopup;
