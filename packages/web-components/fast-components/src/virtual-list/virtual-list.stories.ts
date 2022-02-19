import { html, when } from "@microsoft/fast-element";
import addons from "@storybook/addons";
import { STORY_RENDERED } from "@storybook/core-events";
import {
    VirtualList as FoundationVirtualList,
    VirtualListItem,
    SpanMap,
} from "@microsoft/fast-foundation";
import VirtualListTemplate from "./fixtures/base.html";
import "./index";

const horizontalImageItemTemplate = html`
    <fast-card
        style="
            position: absolute;
            contain: strict;
            height:  100%;
            width:  ${(x, c) => `${c.parent.visibleItemSpans[c.index]?.span}px`};
            transform: ${(x, c) =>
            `translateX(${c.parent.visibleItemSpans[c.index]?.start}px)`};
        "
    >
        <div style="margin: 5px 20px 0 20px; color: white">
            ${x => x.title}
        </div>

        <div
            style="
                height: 160px;
                width:160px;
                margin:10px 20px 10px 20px;
                position: absolute;
                background-image: url('${x => x.url}');
            "
        ></div>
    </fast-card>
`;

const verticalImageItemTemplate = html`
    <fast-card
        style="
            position: absolute;
            contain: strict;
            height:  200px;
            width:  100%;
            transform: ${(x, c) =>
            `translateY(${c.parent.visibleItemSpans[c.index]?.start}px)`};
        "
    >
        <div style="margin: 5px 20px 0 20px; color: white">
            ${x => x.title}
        </div>

        <div
            style="
                height: 160px;
                width:160px;
                margin:10px 20px 10px 20px;
                position: absolute;
                background-image: url('${x => x.url}');
            "
        ></div>
    </fast-card>
`;

const gridItemTemplate = html`
    <div
        style="
            contain: strict;
            position: absolute;
            height: 200px;
            width:  200px;
            transform: ${(x, c) =>
            `translateX(${c.parent.visibleItemSpans[c.index]?.start}px)`};
        "
    >
        <div
            style="
            position: absolute;
            margin: 90px 20px 0 20px;
        "
        >
            ${x => x.title}
        </div>

        <div
            style="
                background: gray;
                height:100%;
                width:100%;
                background-image: url('${x => x.url}');
            "
        ></div>
    </div>
`;

const rowItemTemplate = html`
    <fast-virtual-list
        auto-update-mode="auto"
        orientation="horizontal"
        item-span="200"
        viewport-buffer="100"
        :viewportElement="${(x, c) => c.parent.viewportElement}"
        :itemTemplate="${gridItemTemplate}"
        :items="${x => x.items}"
        style="
            display: block;
            position: absolute;
            height:  200px;
            transform: ${(x, c) =>
            `translateY(${c.parent.visibleItemSpans[c.index]?.start}px)`};
        "
    ></fast-virtual-list>
`;

const listItemContentsTemplate = html`
    <fast-card>
        <div style="margin: 5px 20px 0 20px; color: white">
            ${x => x.listItemContext.titleString} ${x => x.itemData.title}
        </div>
        ${when(
            x => x.loadContent,
            html`
                <div
                    style="
                height: 160px;
                width:160px;
                margin:10px 20px 10px 20px;
                position: absolute;
                background-image: url('${x => x.itemData.url}');
            "
                ></div>
                <fast-slider></fast-slider>
                <fast-slider></fast-slider>
                <fast-slider></fast-slider>
                <fast-slider></fast-slider>
                <fast-slider></fast-slider>
                <fast-slider></fast-slider>
                <fast-slider></fast-slider>
                <fast-slider></fast-slider>
                <fast-slider></fast-slider>
                <fast-slider></fast-slider>
                <fast-slider></fast-slider>
                <fast-slider></fast-slider>
            `
        )}
        ${when(
            x => !x.loadContent,
            html`
                <fast-progress-ring
                    style="
                    height: 160px;
                    width:160px;
                    margin:10px 20px 10px 20px;
                    position: absolute;
            "
                ></fast-progress-ring>
            `
        )}
    </fast-card>
`;

addons.getChannel().addListener(STORY_RENDERED, (name: string) => {
    if (name.toLowerCase().startsWith("virtual-list")) {
        const data = newDataSet(10000, 1);
        const dataSpanMap = generateSpanMap(data);

        const gridData: object[] = [];

        for (let i = 1; i <= 1000; i++) {
            gridData.push({
                items: newDataSet(1000, i),
            });
        }

        const stackh1 = document.getElementById("stackh1") as FoundationVirtualList;
        stackh1.listItemContext = {
            listItemContentsTemplate: listItemContentsTemplate,
            titleString: "title:",
        };
        stackh1.items = newDataSet(100, 1);

        const stackh2 = document.getElementById("stackh2") as FoundationVirtualList;
        stackh2.listItemContext = {
            listItemContentsTemplate: listItemContentsTemplate,
            titleString: "title:",
        };
        stackh2.items = data;

        const stackhIdle = document.getElementById("stackhidle") as FoundationVirtualList;
        stackhIdle.listItemContext = {
            listItemContentsTemplate: listItemContentsTemplate,
            loadMode: "idle",
            titleString: "title:",
        };
        stackhIdle.items = data;

        const stackh3 = document.getElementById("stackh3") as FoundationVirtualList;
        stackh3.itemTemplate = horizontalImageItemTemplate;
        stackh3.items = data;

        const stackh4 = document.getElementById("stackh4") as FoundationVirtualList;
        stackh4.itemTemplate = horizontalImageItemTemplate;
        stackh4.items = data;

        const stackGrid = document.getElementById("stackgrid") as FoundationVirtualList;
        stackGrid.itemTemplate = rowItemTemplate;
        stackGrid.items = gridData;

        const stackv1 = document.getElementById("stackv1") as FoundationVirtualList;
        stackv1.itemTemplate = verticalImageItemTemplate;
        stackv1.viewportElement = document.documentElement;
        stackv1.items = data;

        const stackv2 = document.getElementById("stackv2") as FoundationVirtualList;
        stackv2.items = data;
        stackv2.listItemContext = {
            listItemContentsTemplate: listItemContentsTemplate,
            titleString: "title:",
        };

        const stackv3 = document.getElementById("stackv3") as FoundationVirtualList;
        stackv3.spanmap = dataSpanMap;
        stackv3.items = data;
        stackv3.listItemContext = {
            listItemContentsTemplate: listItemContentsTemplate,
            titleString: "title:",
        };
    }
});

function newDataSet(rowCount: number, prefix: number): object[] {
    const newData: object[] = [];
    for (let i = 1; i <= rowCount; i++) {
        newData.push({
            value: `${i}`,
            title: `item #${i}`,
            url: `https://picsum.photos/200/200?random=${prefix * 1000 + i}`,
        });
    }
    return newData;
}

function generateSpanMap(data: object[]) {
    const spanmap: SpanMap[] = [];
    const itemsCount: number = data.length;
    let currentPosition: number = 0;
    for (let i = 0; i < itemsCount; i++) {
        const nextSpan: number = 200 + Math.floor(Math.random() * 200);
        const spanEnd = nextSpan + currentPosition;
        spanmap.push({
            start: currentPosition,
            span: nextSpan,
            end: spanEnd,
        });
        currentPosition = spanEnd;
    }
    return spanmap;
}

export default {
    title: "Virtual List",
};

export const VirtualList = () => VirtualListTemplate;
