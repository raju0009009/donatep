# Donation Popup Implementation

This document describes the donation popup implementation for the Donate Punjab website.

## Overview

The donation popup is a modal that appears on the main site to encourage users to donate. It features:
- Beautiful background with logo and gradient overlay
- Campaign image with unique clip path design
- Multiple donation amount options
- Session-based display controls
- Responsive design for mobile and desktop

## Files Added

### 1. `src/components/DonationPopup.tsx`
- Main popup component with campaign display
- Supports multiple donation amounts
- Responsive design with mobile-first approach
- Beautiful animations and transitions

### 2. `src/hooks/useDonationPopup.ts`
- Custom hook for managing popup state
- Controls when and how often the popup appears
- Features:
  - Time-based display (after X milliseconds)
  - Scroll-based display (after Y% scroll)
  - Session-based frequency control
  - Session storage for tracking displays

### 3. `src/hooks/useCampaigns.ts`
- Campaign management system
- Supports multiple campaigns with priorities
- Random campaign selection for popup display
- Easy to add new campaigns

### 4. Updated `src/app/page.tsx`
- Integrated popup into main page
- Added campaign management
- Configured popup behavior

### 5. Updated `src/app/globals.css`
- Added custom animations for popup
- Smooth transitions and blur effects
- Dialog-specific styling

## Configuration

### Popup Behavior
```typescript
const { isOpen, close } = useDonationPopup({
  showAfterMs: 3000,           // Show after 3 seconds
  showOnScrollPercentage: 30,  // Show after 30% scroll
  maxShowsPerSession: 2        // Show max 2 times per session
})
```

### Campaign Management
Campaigns are defined in `useCampaigns.ts` with these properties:
- `id`: Unique identifier
- `title`: Campaign title
- `description`: Short description for popup
- `mainImage`: Main campaign image URL
- `logo`: Campaign logo URL (used as background)
- `presetAmount`: Default donation amount
- `isActive`: Whether campaign is active
- `priority`: Display priority (lower = higher priority)

## Usage

### Adding a New Campaign
1. Add campaign to `useCampaigns.ts`:
```typescript
{
  id: "new-campaign",
  title: "New Campaign Title",
  description: "Campaign description",
  mainImage: "/campaign-image.jpg",
  logo: "/campaign-logo.png",
  presetAmount: 5000,
  isActive: true,
  priority: 4
}
```

### Customizing Popup Behavior
Modify the `useDonationPopup` hook parameters in `page.tsx`:
- `showAfterMs`: Delay before showing popup
- `showOnScrollPercentage`: Scroll percentage to trigger popup
- `maxShowsPerSession`: Maximum shows per browser session

### Styling
The popup uses Tailwind CSS with custom animations in `globals.css`. Key styles:
- Backdrop blur effect
- Slide-in animation
- Opacity transitions
- Responsive sizing

## Features

### Session Management
- Uses sessionStorage to track popup displays
- Resets after 1 hour of inactivity
- Respects user privacy (no cookies)

### Responsive Design
- Mobile-first approach
- Adapts to different screen sizes
- Touch-friendly buttons

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly

### Performance
- Lazy loading of images
- Optimized animations
- Minimal DOM manipulation

## Testing

To test the popup:
1. Open the website in a browser
2. Wait for the configured delay (default: 3 seconds)
3. Or scroll down to trigger percentage-based display
4. Close the popup and refresh to test session limits
5. Clear browser data to reset session tracking

## Troubleshooting

### Popup Not Appearing
- Check browser console for errors
- Verify campaign images are accessible
- Clear sessionStorage to reset display counter
- Check if campaigns are marked as `isActive: true`

### Images Not Loading
- Verify image URLs are correct
- Check Next.js Image component configuration
- Ensure external images are properly configured in `next.config.js`

### Animation Issues
- Verify CSS animations are properly loaded
- Check browser compatibility
- Ensure Tailwind CSS is properly configured

## Future Enhancements

### Planned Features
- A/B testing for different popup designs
- Campaign performance tracking
- User segmentation for targeted campaigns
- Custom donation amount input
- Social proof integration (recent donors)

### Technical Improvements
- Add TypeScript interfaces for better type safety
- Implement proper error boundaries
- Add loading states for images
- Optimize bundle size with code splitting
- Add proper testing infrastructure