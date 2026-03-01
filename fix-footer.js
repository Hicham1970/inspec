const fs = require('fs');
const path = 'frontend/src/components/layout/Footer.jsx';

let content = fs.readFileSync(path, 'utf8');

// Find and replace the TextField sx prop
const oldSx = `sx={{ 
                  bgcolor: 'white', 
                  borderRadius: 1, 
                  flexGrow: 1,
                  '& .MuiOutlinedInput-root': { height: 40 },
                  '& .MuiOutlinedInput-input': { 
                    color: '#000000',
                    '&::placeholder': {
                      color: '#666666',
                      opacity: 1
                    }
                  }
                }}`;

const newSx = `sx={{ 
                  bgcolor: 'white', 
                  borderRadius: 1, 
                  flexGrow: 1,
                  '& .MuiOutlinedInput-root': { 
                    height: 40,
                    backgroundColor: 'white',
                    color: '#000000'
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#000000 !important',
                    WebkitTextFillColor: '#000000 !important'
                  },
                  '& ::placeholder': {
                    color: '#666666 !important',
                    opacity: 1
                  }
                }}`;

content = content.replace(oldSx, newSx);

fs.writeFileSync(path, content);
console.log('File updated successfully!');
