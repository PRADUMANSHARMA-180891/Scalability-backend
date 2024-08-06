const Suggestion = require('../models/suggestion/SuggestionModels');

const createSuggestion = async(req,res) =>{
    try {
        const { suggestionText, anonymous, userId } = req.body;
    
        if (!suggestionText) {
          return res.status(400).json({ error: 'Suggestion text is required' });
        }
    
        const newSuggestion = await Suggestion.create({
          suggestionText,
          anonymous,
          userId: anonymous ? null : userId,
        });
    
        res.status(201).json(newSuggestion);
      } catch (error) {
        console.error('Error creating suggestion:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };

module.exports = createSuggestion