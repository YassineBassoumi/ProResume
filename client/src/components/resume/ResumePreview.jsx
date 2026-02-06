import React, { useState, useRef, forwardRef } from 'react';
import Template1 from './templates/Template1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';
import Template4 from './templates/Template4';
import Template5 from './templates/Template5';
import Template6 from './templates/Template6';
import Template7 from './templates/Template7';
import Template8 from './templates/Template8';
import Template9 from './templates/Template9';

const ResumePreview = forwardRef(({ data, template }, ref) => {
    const [zoomLevel, setZoomLevel] = useState(0.65); // Default to 65% to fit full page in view
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const minZoom = 0.3;
    const maxZoom = 2;
    const zoomStep = 0.1;

    // Render the selected template
    const renderTemplate = () => {
        switch (template) {
            case 'template1':
                return <Template1 data={data} />;
            case 'template2':
                return <Template2 data={data} />;
            case 'template3':
                return <Template3 data={data} />;
            case 'template4':
                return <Template4 data={data} />;
            case 'template5':
                return <Template5 data={data} />;
            case 'template6':
                return <Template6 data={data} />;
            case 'template7':
                return <Template7 data={data} />;
            case 'template8':
                return <Template8 data={data} />;
            case 'template9':
                return <Template9 data={data} />;
            default:
                return <Template1 data={data} />;
        }
    };

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + zoomStep, maxZoom));
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - zoomStep, minZoom));
    };

    const handleResetZoom = () => {
        setZoomLevel(0.65);
        setPosition({ x: 0, y: 0 });
    };

    const handleFitToWidth = () => {
        setZoomLevel(0.65);
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e) => {
        if (e.button === 0) { // Left click only
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
            e.preventDefault();
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
            setZoomLevel(prev => Math.max(minZoom, Math.min(maxZoom, prev + delta)));
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full bg-[#e5e7eb] dark:bg-gray-900 overflow-hidden rounded-lg"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
            {/* Canvas Content */}
            <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                }}
            >
                <div
                    className="transition-transform duration-200"
                    style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: 'center center'
                    }}
                >
                    <div ref={ref} className="w-[8.5in] bg-white shadow-2xl" style={{ pointerEvents: 'none' }}>
                        {renderTemplate()}
                    </div>
                </div>
            </div>

            {/* Zoom Controls Overlay */}
            <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
                <div className="flex flex-col gap-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2">
                    <button
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= maxZoom}
                        className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Zoom In (Ctrl + Scroll)"
                    >
                        <span className="material-symbols-outlined text-xl text-gray-700 dark:text-gray-300">add</span>
                    </button>

                    <div className="h-px bg-gray-200 dark:bg-gray-600 mx-1"></div>

                    <button
                        onClick={handleResetZoom}
                        className="px-2 h-10 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                        title="Reset View"
                    >
                        {Math.round(zoomLevel * 100)}%
                    </button>

                    <div className="h-px bg-gray-200 dark:bg-gray-600 mx-1"></div>

                    <button
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= minZoom}
                        className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Zoom Out (Ctrl + Scroll)"
                    >
                        <span className="material-symbols-outlined text-xl text-gray-700 dark:text-gray-300">remove</span>
                    </button>

                    <div className="h-px bg-gray-200 dark:bg-gray-600 mx-1"></div>

                    <button
                        onClick={handleFitToWidth}
                        className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="Fit to View"
                    >
                        <span className="material-symbols-outlined text-xl text-gray-700 dark:text-gray-300">fit_screen</span>
                    </button>
                </div>
            </div>
        </div>
    );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
