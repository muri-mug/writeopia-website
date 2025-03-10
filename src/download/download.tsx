import React from "react"
import { useEffect, useState, Suspense } from "react"
import { useTranslation } from "react-i18next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Download, Apple, ComputerIcon as Windows, LaptopIcon as Linux, Info } from "lucide-react"
import DefaultLink from "../components/ui/default-link"

type Platform = "windows" | "macos" | "linux"

export default function DownloadPage() {
  const { t } = useTranslation()
  const [platform, setPlatform] = useState<Platform>("windows")

  useEffect(() => {
    setPlatform(detectPlatform())
  }, [])

  return (
    <Suspense fallback="loading">
      <section className="w-full py-8">
        <div className="flex flex-col lg:flex-row items-center pb-10 px-8 md:px-24 lg:px-32">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold pt-24">{t("download_title", "Download the latest version for")} {platform}</h1>
            <p className="text-muted-foreground text-3xl pb-10">
              {t("download_subtitle", "Have a great experience, without sharing your data.")}
            </p>

            <MainDownloadButton platform={platform}></MainDownloadButton>      
          </div>

          <img src="/download_teaser_light.png" alt="Screenshot of Writeopia"  className="w-auto h-max-[600] object-cover object-cover lg:pl-20 pl-0 pt-10 lg:pt-0 dark:hidden" />
          <img src="/download_teaser_dark.png" alt="Screenshot of Writeopia" className="w-auto h-max-[600] object-cover object-cover lg:pl-20 pl-0 pt-10 lg:pt-0 hidden dark:block" />
        </div>

        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("choose_platform", "Choose your platform and download the latest version of Writeopia")}
            </p>
          </div>

          <div className="mx-auto max-w-3xl mt-12">
            <PlatformTabs platform={platform} />
          </div>
        </div>
      </section>
    </Suspense>
  )
}

const detectPlatform = (): "windows" | "linux" | "macos" => {
    if (typeof window === "undefined") return "windows";
    
    const userAgent = window.navigator.userAgent.toLowerCase();
    const platform = window.navigator.platform.toLowerCase();
    
    if (platform.includes("win")) return "macos";
    if (platform.includes("mac")) return "macos";
    if (platform.includes("linux")) return "linux";
    
    return "macos";
  };

function PlatformTabs({ platform }: { platform: Platform }) {
  return (
    <Tabs defaultValue={platform} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="windows" className="flex items-center justify-center gap-2">
          <Windows className="h-4 w-4" />
          Windows
        </TabsTrigger>
        <TabsTrigger value="macos" className="flex items-center justify-center gap-2">
          <Apple className="h-4 w-4" />
          macOS
        </TabsTrigger>
        <TabsTrigger value="linux" className="flex items-center justify-center gap-2">
          <Linux className="h-4 w-4" />
          Linux
        </TabsTrigger>
      </TabsList>

      <TabsContent value="windows">
        <WindowsDownloads />
      </TabsContent>

      <TabsContent value="macos">
        <MacOSDownloads />
      </TabsContent>

      <TabsContent value="linux">
        <LinuxDownloads />
      </TabsContent>
    </Tabs>
  )
}

function WindowsDownloads() {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Windows</CardTitle>
        <CardDescription>{t("windows_download_description", "Download Writeopia for Windows")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{t("coming_soon", "coming_soon")}</p>
        {/* <DownloadButton
          href="https://writeopia.io/apps-download/latest/Writeopia.msi"
          label={t("download_windows_installer", "Download Windows Installer (.msi)")}          
        /> */}
      </CardContent>
    </Card>
  )
}

function MacOSDownloads() {
  const { t } = useTranslation()
  const isAppleSilicon = detectAppleSilicon()

  return (
    <Card>
      <CardHeader>
        <CardTitle>macOS</CardTitle>
        <CardDescription>{t("macos_download_description", "Download Writeopia for macOS")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <DownloadButton
          href="https://writeopia.io/apps-download/latest/Writeopia.dmg"
          label={t("download_macos_apple_silicon", "Download for Apple Silicon")}          
          highlighted={isAppleSilicon}
        />
        <DownloadButton
          href="https://writeopia.io/apps-download/latest/Writeopia-intel.dmg"
          label={t("download_macos_intel", "Download for Intel Mac")}          
          highlighted={!isAppleSilicon}
        />
      </CardContent>
    </Card>
  )
}

function LinuxDownloads() {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Linux</CardTitle>
        <CardDescription>{t("linux_download_description", "Download Writeopia for Linux")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <DownloadButton
          href="https://writeopia.io/apps-download/latest/Writeopia.deb"
          label={t("download_linux_deb", "Download .deb package (Ubuntu, Debian)")}          
        />
      </CardContent>
    </Card>
  )
}

function DownloadButton({
  href,
  label,  
  highlighted = false,
}: {
  href: string
  label: string  
  highlighted?: boolean
}) {
  return (
    <div
      className={`p-4 rounded-xl border ${highlighted ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700" : "border-gray-200 dark:border-gray-800"}`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-medium">{label}</h3>          
        </div>
        <Button asChild className="rounded-xl">
          <a href={href} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download
          </a>
        </Button>
      </div>
    </div>
  )
}

function getWriteopiaFile(platform: "windows" | "macos" | "macos-intel" | "linux"): string {
  const basePath = "https://writeopia.io/apps-download/latest"

  switch (platform) {
    case "windows":
      return `${basePath}/Writeopia.msi`;
    case "macos":
      return `${basePath}/Writeopia.dmg`;
    case "macos-intel":
      return `${basePath}/Writeopia-intel.dmg`;
    case "linux":
      return `${basePath}/Writeopia.deb`;
    default:
      return `${basePath}/Writeopia.msi`;
  }
}

type DownloadButtonProps = {
  platform: "windows" | "macos" | "linux";
};

const MainDownloadButton: React.FC<DownloadButtonProps> = ({ platform }) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center">
      {platform === "macos" ? (
        <>
          <Button asChild className="rounded-xl">
            <a href={getWriteopiaFile("macos")} className="flex items-center gap-2">
              <Download className="h-4 w-4" /> 
              {t("download_macos_apple_silicon", "Download for Mac (Silicon)")}              
            </a>          
          </Button>

          <div className="h-4"/>

          <Button asChild className="rounded-xl">
            <a href={getWriteopiaFile("macos-intel")} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              {t("download_macos_intel", "Download for Intel Mac")}
            </a>          
          </Button>
        </>
      ) : (
        <Button asChild className="rounded-xl">
          <a href={getWriteopiaFile(platform)} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
              {t("download_for", "Download for")} {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </a>       
        </Button>
      )}
    </div>
  )
}

function detectAppleSilicon(): boolean {
  const userAgent = window.navigator.userAgent.toLowerCase()

  // This is a simplified check - in reality, detecting Apple Silicon from the browser
  // is not 100% reliable as the user agent doesn't explicitly mention the chip architecture
  // A more reliable approach would be to check for specific features or performance characteristics

  // Check if it's a Mac
  if (userAgent.indexOf("mac") !== -1) {
    // For this example, we'll use a simplified approach
    // In a real app, you might want to use more sophisticated detection
    // or just ask the user to select the right version

    // Check if it's a newer Mac (released after Apple Silicon transition began)
    // This is just an approximation
    const isBigSurOrNewer = /mac os x 10_16|mac os x 11|mac os x 12|mac os x 13|mac os x 14/.test(userAgent)

    return isBigSurOrNewer
  }

  return false
}
