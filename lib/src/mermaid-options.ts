/* eslint-disable */
export namespace MermaidAPI {
  export enum SecurityLevel {
    /**
     * (default) tags in text are encoded, click functionality is disabled
     */
    Strict = 'strict',

    /**
     * tags in text are allowed, click functionality is enabled
     */
    Loose = 'loose',

    /**
     * html tags in text are allowed, (only script element is removed), click functionality is enabled
     */
    Antiscript = 'antiscript',

    /**
     * with this security level all rendering takes place in a sandboxed iframe.
     * This prevent any javascript running in the context.
     * This may hinder interactive functionality of the diagram like scripts,
     * popups in sequence diagram or links to other tabs/targets etc.
     */
    Sandbox = 'sandbox'
  }

  export enum Theme {
    /**
     * Designed to modified, as the name implies it is supposed to be used as the base for making custom themes.
     */
    Base = 'base',

    /**
     * A theme full of light greens that is easy on the eyes.
     */
    Forest = 'forest',

    /**
     * A theme that would go well with other dark colored elements.
     */
    Dark = 'dark',

    /**
     *  The default theme for all diagrams.
     */
    Default = 'default',

    /**
     * The theme to be used for black and white printing
     */
    Neutral = 'neutral'
  }

  export enum LogLevel {
    Debug = 1,
    Info,
    Warn,
    Error,
    Fatal
  }

  export interface FlowChartConfig {
    /**
     * **diagramPadding** - amount of padding around the diagram as a whole
     * default: 8
     */
    diagramPadding?: number | undefined;

    /**
     * **htmlLabels** - Flag for setting whether or not a html tag should be used for rendering labels
     * on the edges
     * default: true
     */
    htmlLabels?: boolean | undefined;

    /**
     * **nodeSpacing** - Defines the spacing between nodes on the same level
     * default: 50
     */
    nodeSpacing?: number | undefined;

    /**
     * **rankSpacing** - Defines the spacing between nodes on different levels
     * default: 50
     */
    rankSpacing?: number | undefined;

    /**
     * default: 'monotoneX'
     */
    curve?: string | undefined;

    /**
     * **rankSpacing** - Only used in new experimental rendering, represents the padding between the labels and the shape
     * default: 15
     */
    padding?: number | undefined;

    /**
     * default: true
     */
    useMaxWidth?: boolean | undefined;
  }

  export interface SequenceDiagramConfig {
    /**
     * **diagramMarginX** - margin to the right and left of the sequence diagram
     * default: 50
     */
    diagramMarginX?: number | undefined;

    /**
     * **diagramMarginY** - margin to the over and under the sequence diagram
     * default: 10
     */
    diagramMarginY?: number | undefined;

    /**
     * **actorMargin** - Margin between actors
     * default: 10
     */
    actorMargin?: number | undefined;

    /**
     * **width** - Width of actor boxes
     * default: 150
     */
    width?: number | undefined;

    /**
     * **height** - Height of actor boxes
     * default: 65
     */
    height?: number | undefined;

    /**
     * **boxMargin** - Margin around loop boxes
     * default: 10
     */
    boxMargin?: number | undefined;

    /**
     * **boxTextMargin** - margin around the text in loop/alt/opt boxes
     * default: 5
     */
    boxTextMargin?: number | undefined;

    /**
     * **noteMargin** - margin around notes
     * default: 10
     */
    noteMargin?: number | undefined;

    /**
     * **messageMargin** - Space between messages
     * default: 35
     */
    messageMargin?: number | undefined;

    /**
     * **mirrorActors** - mirror actors under diagram
     * default: true
     */
    mirrorActors?: boolean | undefined;

    /**
     * **bottomMarginAdj** - Depending on css styling this might need adjustment.
     * Prolongs the edge of the diagram downwards
     * default: 1
     */
    bottomMarginAdj?: number | undefined;

    /**
     * **useMaxWidth** - when this flag is set the height and width is set to 100% and is then scaling with the
     * available space if not the absolute space required is used
     * default: true
     */
    useMaxWidth?: boolean | undefined;

    /**
     * This will display arrows that start and begin at the same node as right angles, rather than a curve
     * Default value: false
     */
    rightAngles?: boolean | undefined;
  }

  export interface GanttConfig {
    /**
     * **titleTopMargin** - margin top for the text over the gantt diagram
     * default: 25
     */
    titleTopMargin?: number | undefined;

    /**
     * **barHeight** - the height of the bars in the graph
     * default: 20
     */
    barHeight?: number | undefined;

    /**
     * **barGap** - the margin between the different activities in the gantt diagram
     * default: 4
     */
    barGap?: number | undefined;

    /**
     *  **topPadding** - margin between title and gantt diagram and between axis and gantt diagram.
     * default: 50
     */
    topPadding?: number | undefined;

    /**
     *  **leftPadding** - the space allocated for the section name to the left of the activities.
     * default: 75
     */
    leftPadding?: number | undefined;

    /**
     *  **gridLineStartPadding** - Vertical starting position of the grid lines
     * default: 35
     */
    gridLineStartPadding?: number | undefined;

    /**
     *  **fontSize** - font size ...
     * default: 11
     */
    fontSize?: number | undefined;

    /**
     * **fontFamily** - font family ...
     * default:  '"Open-Sans", "sans-serif"'
     */
    fontFamily?: string | undefined;

    /**
     * **numberSectionStyles** - the number of alternating section styles
     * default: 4
     */
    numberSectionStyles?: number | undefined;

    /**
     * **axisFormat** - datetime format of the axis, this might need adjustment to match your locale and preferences
     * default: '%Y-%m-%d'
     */
    axisFormat?: string | undefined;
  }

  export interface Config {
    /**
     * ### securityLevel
     * This changes the default behaviour of mermaid so that after upgrade to 8.2,
     * unless the `securityLevel` is not changed, tags in flowcharts are encoded as tags and clicking is disabled.
     * **sandbox** security level is still in the beta version.
     * default: SecurityLevel.Strict
     */
    securityLevel?: SecurityLevel | undefined;

    theme?: Theme | undefined;

    themeVariables?: any; // [todo]

    themeCSS?: string | undefined;

    maxTextSize?: number | undefined;

    darkMode?: boolean | undefined;

    fontFamily?: string | undefined;

    /**
     * logLevel , decides the amount of logging to be used.
     * default: LogLevel.Fatal
     */
    logLevel?: LogLevel | undefined;

    /**
     * **startOnLoad** - This options controls whether or mermaid starts when the page loads
     * default: true
     */
    startOnLoad?: boolean | undefined;

    /**
     * **arrowMarkerAbsolute** - This options controls whether or arrow markers in html code will be absolute paths or
     * an anchor, #. This matters if you are using base tag settings.
     * default: false
     */
    arrowMarkerAbsolute?: boolean | undefined;

    secure?: Array<keyof Config> | undefined;

    deterministicIds?: boolean | undefined;

    deterministicIDSeed?: string | undefined;

    /**
     * ### flowchart
     * *The object containing configurations specific for flowcharts*
     */
    flowchart?: FlowChartConfig | undefined;

    /**
     * ###  sequenceDiagram
     * The object containing configurations specific for sequence diagrams
     */
    sequence?: SequenceDiagramConfig | undefined;

    /**
     * ### gantt
     * The object containing configurations specific for gantt diagrams*
     */
    gantt?: GanttConfig | undefined;

    journey?: any; // [todo]

    class?: any; // [todo]

    git?: any; // [todo]

    state?: any; // [todo]

    pie?: any; // [todo]

    requirement?: any; // [todo]
  }
}
