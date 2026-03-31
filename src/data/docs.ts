export interface DocSection {
  id: string;
  title: string;
  children?: DocPage[];
}

export interface DocPage {
  id: string;
  title: string;
  content: string;
}

export const applicationSections: DocSection[] = [
  {
    id: "app-overview",
    title: "Overview",
    children: [
      {
        id: "app-overview",
        title: "Overview",
        content: `Writeopia is a versatile text editor packed with powerful features to enhance your writing experience. This documentation provides an in-depth guide to its features and explains how they work.

## Key Features

- **Privacy-first**: Your data stays where you choose — locally or in the cloud of your preference.
- **Cross-platform**: Available on Android, iOS, Mac, Windows, Linux and Web.
- **Open formats**: Export your documents in standard formats. No lock-in.
- **AI-powered**: Choose from open-source AI agents. Run them locally for maximum privacy.`,
      },
    ],
  },
  {
    id: "app-getting-started",
    title: "Getting Started",
    children: [
      {
        id: "app-getting-started-download",
        title: "Download & Install",
        content: `## Download & Install

Writeopia is available on all major platforms. Choose your preferred platform below:

| Platform | Status |
|----------|--------|
| Android | ✅ Available |
| iOS | ✅ Available |
| macOS | ✅ Available |
| Windows | ✅ Available |
| Linux | ✅ Available |
| Web | ✅ Available |

Visit the [download page](/download) to get the latest version for your platform.`,
      },
    ],
  },
  {
    id: "app-ai",
    title: "Using AI",
    children: [
      {
        id: "app-ai-commands",
        title: "AI Commands",
        content: `## AI Commands

Writeopia supports AI-powered text editing through open-source models that can run locally on your device.

### How it works

1. Choose your preferred AI model from the settings
2. Models can run entirely on your device — no data leaves your machine
3. Use AI commands to generate, edit, summarize, or transform text

### Available Commands

- **Generate**: Create new content based on a prompt
- **Summarize**: Condense long text into key points
- **Rewrite**: Rephrase text while preserving meaning
- **Translate**: Convert text between languages
- **Fix Grammar**: Correct grammatical errors automatically`,
      },
    ],
  },
  {
    id: "app-writing",
    title: "Writing",
    children: [
      {
        id: "app-writing-editor",
        title: "The Editor",
        content: `## The Editor

Writeopia's editor is designed for speed, simplicity, and flexibility.

### Block-based editing

Content is organized in blocks — paragraphs, headings, lists, code blocks, images, and more. Each block can be independently styled and rearranged.

### Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| \`Ctrl/Cmd + B\` | Bold |
| \`Ctrl/Cmd + I\` | Italic |
| \`Ctrl/Cmd + K\` | Link |
| \`Ctrl/Cmd + Shift + H\` | Highlight |
| \`/\` | Command menu |

### Slash commands

Type \`/\` anywhere to open the command menu and quickly insert headings, lists, code blocks, images, and more.`,
      },
    ],
  },
  {
    id: "app-documents",
    title: "Documents",
    children: [
      {
        id: "app-documents-management",
        title: "Managing Documents",
        content: `## Managing Documents

### Storage options

- **Local storage**: Documents are stored on your device. Full offline access with no cloud dependency.
- **Cloud sync**: Optionally sync with your preferred cloud provider.

### Export formats

Writeopia supports exporting in multiple open formats:

- **Markdown** (.md)
- **Plain Text** (.txt)
- **HTML** (.html)
- **PDF** (.pdf)

### Organization

- Create folders to organize your documents
- Tag documents for quick filtering
- Search across all your documents instantly`,
      },
    ],
  },
];

export const sdkSections: DocSection[] = [
  {
    id: "sdk-overview",
    title: "Overview",
    children: [
      {
        id: "sdk-overview",
        title: "Overview",
        content: `Writeopia is a component to add rich text editors inside apps using Kotlin. This SDK aims to be a platform to create a text edition from end to end. It provides components both for the backend and mobile so developers create both the UI and data for text editors.

The editor uses a simple core and each part of the editor can be configured independently like list items, headers, titles, and images.

## Is this library right for me?

Writeopia is the library for you if you're building a project using Kotlin and you plan to support text that is more complex than a simple box with text input.

This library doesn't have a specific case and allows the developer to choose how many libraries to use and how much code should be inside the SDK or inside the client code. You can choose how many features of the SDK you would like to have which makes it good for both simple and complex scenarios.

The default drawers for each component and the default behavior were intended for technical documentation, but the library can be extended to support different use cases and UI themes.

## Architecture and Design choices

I decided to create high-level building blocks loosely coupled from each other, instead of a class that solves everything. The library doesn't start as a single point of interaction and everything is hidden away from the user because that would reduce the options for usage of the library and also the ways it can be customized. This project was tailored to be very robust and versatile as your needs grow, instead of a very simple and well-defined use case.

## Issues and support

You can go to the [issues](https://github.com/leandroBorgesFerreira/Writeopia/issues) page to start a discussion, ask for help, request a feature, or offer some help. If you find this project interesting to you and would like to contribute, don't shy out! It can be an interesting place to challenge your Kotlin knowledge and/or try something new as it has code both in the front end and in the backend.`,
      },
    ],
  },
  {
    id: "sdk-getting-started",
    title: "Getting Started",
    children: [
      {
        id: "sdk-getting-started-setup",
        title: "Setup",
        content: `## Setup

Add Writeopia to your project by including the following dependencies in your \`build.gradle.kts\`:

\`\`\`kotlin
// Core module (required)
implementation("io.writeopia:writeopia-core:1.0.0")

// UI module for Compose (required for UI)
implementation("io.writeopia:writeopia-ui:1.0.0")

// Optional: Persistence module
implementation("io.writeopia:writeopia-persistence:1.0.0")

// Optional: Network module
implementation("io.writeopia:writeopia-network:1.0.0")
\`\`\`

### Kotlin Multiplatform

Writeopia supports Kotlin Multiplatform. You can use it in:

- **Android** (Jetpack Compose)
- **iOS** (Compose Multiplatform)
- **Desktop** (Compose for Desktop)
- **Web** (Compose for Web / Wasm)`,
      },
      {
        id: "sdk-getting-started-android",
        title: "Android",
        content: `## Android Setup

### Requirements

- Kotlin 1.9+
- Jetpack Compose 1.5+
- Android API 24+

### Basic usage

\`\`\`kotlin
@Composable
fun MyEditor() {
    val writeopiaManager = remember { WriteopiaManager() }

    WriteopiaEditor(
        manager = writeopiaManager,
        modifier = Modifier.fillMaxSize()
    )
}
\`\`\`

### Customizing the editor

You can customize the appearance and behavior of each component type (headers, paragraphs, lists, etc.) by providing custom drawers:

\`\`\`kotlin
WriteopiaEditor(
    manager = writeopiaManager,
    drawers = DefaultDrawers.create(
        headerDrawer = MyCustomHeaderDrawer(),
        paragraphDrawer = MyCustomParagraphDrawer()
    )
)
\`\`\``,
      },
      {
        id: "sdk-getting-started-desktop",
        title: "Desktop",
        content: `## Desktop Setup

### Requirements

- Kotlin 1.9+
- Compose for Desktop

### Basic usage

\`\`\`kotlin
fun main() = application {
    Window(onCloseRequest = ::exitApplication) {
        val writeopiaManager = remember { WriteopiaManager() }

        WriteopiaEditor(
            manager = writeopiaManager,
            modifier = Modifier.fillMaxSize()
        )
    }
}
\`\`\`

Desktop support follows the same API as Android, leveraging Kotlin Multiplatform for code sharing.`,
      },
    ],
  },
  {
    id: "sdk-customize-drawing",
    title: "Customize Drawing",
    children: [
      {
        id: "sdk-customize-drawing-overview",
        title: "Custom Drawers",
        content: `## Custom Drawers

Each content type in Writeopia (headers, paragraphs, images, lists, etc.) is rendered by a "drawer". You can replace or extend any drawer to match your app's design.

### How it works

1. Create a class implementing the \`StoryStepDrawer\` interface
2. Define how your component should be rendered in Compose
3. Register it in the \`DrawersConfig\`

### Example

\`\`\`kotlin
class MyHeaderDrawer : StoryStepDrawer {
    @Composable
    override fun Draw(
        step: StoryStep,
        drawInfo: DrawInfo,
        interactionHandler: InteractionHandler
    ) {
        Text(
            text = step.text.orEmpty(),
            style = MaterialTheme.typography.headlineLarge,
            color = MaterialTheme.colorScheme.primary,
            modifier = Modifier.padding(vertical = 8.dp)
        )
    }
}
\`\`\``,
      },
    ],
  },
  {
    id: "sdk-ui-commands",
    title: "UI Commands",
    children: [
      {
        id: "sdk-ui-commands-overview",
        title: "UI Commands",
        content: `## UI Commands

UI Commands allow you to programmatically control the editor's behavior — adding, removing, and modifying content blocks from code.

### Available commands

| Command | Description |
|---------|-------------|
| \`addBlock\` | Add a new content block |
| \`removeBlock\` | Remove a content block |
| \`moveBlock\` | Reorder blocks |
| \`updateBlock\` | Update block content |
| \`changeType\` | Change block type (e.g., paragraph → heading) |

### Usage

\`\`\`kotlin
val manager = WriteopiaManager()

// Add a heading
manager.addBlock(
    StoryStep(
        type = StoryTypes.HEADER.type,
        text = "My Title"
    )
)

// Change a block type
manager.changeType(blockId, StoryTypes.LIST_ITEM.type)
\`\`\``,
      },
    ],
  },
  {
    id: "sdk-text-commands",
    title: "Text Commands",
    children: [
      {
        id: "sdk-text-commands-overview",
        title: "Text Commands",
        content: `## Text Commands

Text Commands are shortcuts triggered by typing specific characters. For example, typing \`#\` at the beginning of a line converts it to a heading.

### Built-in commands

| Input | Result |
|-------|--------|
| \`# \` | Heading 1 |
| \`## \` | Heading 2 |
| \`### \` | Heading 3 |
| \`- \` | Unordered list |
| \`1. \` | Ordered list |
| \`[ ] \` | Checkbox |
| \`> \` | Quote block |
| \`\\\`\\\`\\\` \` | Code block |

### Custom text commands

You can define your own text commands:

\`\`\`kotlin
val customCommands = listOf(
    TextCommand(
        trigger = "!! ",
        transformation = { StoryTypes.CALLOUT.type }
    )
)

WriteopiaEditor(
    manager = writeopiaManager,
    textCommands = defaultTextCommands + customCommands
)
\`\`\``,
      },
    ],
  },
  {
    id: "sdk-export",
    title: "Export Notes",
    children: [
      {
        id: "sdk-export-overview",
        title: "Export",
        content: `## Export Notes

Writeopia supports exporting documents to multiple formats programmatically.

### Supported formats

- **Markdown**: Full markdown export with support for all block types
- **Plain text**: Clean text without formatting
- **HTML**: Rich HTML output
- **JSON**: Raw document structure for custom processing

### Usage

\`\`\`kotlin
val exporter = WriteopiaExporter()

// Export to Markdown
val markdown = exporter.toMarkdown(document)

// Export to HTML
val html = exporter.toHtml(document)

// Export to JSON
val json = exporter.toJson(document)
\`\`\`

### Custom exporters

Implement the \`DocumentExporter\` interface to create exporters for any format you need.`,
      },
    ],
  },
  {
    id: "sdk-api-reference",
    title: "API Reference",
    children: [
      {
        id: "sdk-api-reference-overview",
        title: "API Reference",
        content: `## API Reference

### Core classes

#### WriteopiaManager

The main entry point for controlling the editor.

\`\`\`kotlin
class WriteopiaManager {
    fun addBlock(step: StoryStep)
    fun removeBlock(id: String)
    fun moveBlock(from: Int, to: Int)
    fun updateBlock(id: String, text: String)
    fun changeType(id: String, type: Int)
    fun undo()
    fun redo()
    fun getDocument(): Document
    fun loadDocument(document: Document)
}
\`\`\`

#### StoryStep

Represents a single content block in the editor.

\`\`\`kotlin
data class StoryStep(
    val id: String = UUID.randomUUID().toString(),
    val type: Int,
    val text: String? = null,
    val url: String? = null,
    val decoration: Decoration? = null,
    val steps: List<StoryStep> = emptyList()
)
\`\`\`

#### StoryTypes

Predefined content types.

\`\`\`kotlin
enum class StoryTypes(val type: Int) {
    TEXT(0),
    HEADER(1),
    HEADER_2(2),
    HEADER_3(3),
    LIST_ITEM(4),
    ORDERED_LIST(5),
    CHECK_ITEM(6),
    IMAGE(7),
    CODE_BLOCK(8),
    QUOTE(9),
    DIVIDER(10)
}
\`\`\`

For the complete API reference, visit the [GitHub repository](https://github.com/leandroBorgesFerreira/Writeopia).`,
      },
    ],
  },
];
